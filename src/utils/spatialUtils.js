import * as turf from '@turf/turf';

// Check if point [lat, lng] is inside or intersects with features
export function checkPointOverlap(lat, lng, featureCollections) {
  const point = turf.point([lng, lat]);
  const results = [];

  featureCollections.forEach(({ category, color, collection }) => {
    collection.features.forEach((feature) => {
      try {
        const poly = turf.polygon(feature.geometry.coordinates);
        const isInside = turf.booleanPointInPolygon(point, poly);
        if (isInside) {
          results.push({
            category,
            color,
            properties: feature.properties,
            id: feature.id
          });
        }
      } catch (e) {
        console.warn('Poly check error:', e);
      }
    });
  });

  return results;
}

// Calculate distance between two points in km or m
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const from = turf.point([lon1, lat1]);
  const to = turf.point([lon2, lat2]);
  const distanceKm = turf.distance(from, to, { units: 'kilometers' });
  if (distanceKm < 1) {
    return `${(distanceKm * 1000).toFixed(1)} meter`;
  }
  return `${distanceKm.toFixed(2)} km`;
}

// Calculate area of polygon coordinates in hectares and sq meters
export function calculateArea(coordinates) {
  try {
    const polygon = turf.polygon(coordinates);
    const areaSqMeters = turf.area(polygon);
    const hectares = areaSqMeters / 10000;
    const acres = hectares * 2.47105;
    return {
      sqMeters: areaSqMeters.toFixed(2),
      hectares: hectares.toFixed(2),
      acres: acres.toFixed(2)
    };
  } catch (e) {
    return { sqMeters: '0', hectares: '0', acres: '0' };
  }
}

// Generate Google Maps URL
export function getGoogleMapsUrl(lat, lng, zoom = 15) {
  return `https://www.google.com/maps/@${lat},${lng},${zoom}z`;
}

export function getGoogleStreetViewUrl(lat, lng) {
  return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;
}

export function getGoogleDirectionsUrl(lat, lng) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

// Generate Buffer Feature around point [lat, lng]
export function createBufferGeometry(lat, lng, radiusInMeters) {
  const point = turf.point([lng, lat]);
  const buffered = turf.buffer(point, radiusInMeters / 1000, { units: 'kilometers' });
  return buffered;
}

// Calculate feature centroid and flat points [lat, lng]
export function getFeatureCenterAndBounds(feature) {
  if (!feature || !feature.geometry) return null;
  const geomType = feature.geometry.type;
  const coords = feature.geometry.coordinates;

  let flatPts = [];
  if (geomType === 'Polygon') {
    flatPts = (coords[0] || []).map(pt => [pt[1], pt[0]]);
  } else if (geomType === 'MultiPolygon') {
    (coords || []).forEach(poly => {
      if (poly && poly[0]) {
        poly[0].forEach(pt => flatPts.push([pt[1], pt[0]]));
      }
    });
  } else if (geomType === 'Point') {
    return { center: [coords[1], coords[0]], coords: [[coords[1], coords[0]]] };
  } else if (geomType === 'LineString' || geomType === 'Polyline') {
    flatPts = (coords || []).map(pt => [pt[1], pt[0]]);
  } else if (geomType === 'MultiLineString') {
    (coords || []).forEach(line => {
      (line || []).forEach(pt => flatPts.push([pt[1], pt[0]]));
    });
  }

  if (flatPts.length === 0) return null;

  let sumLat = 0, sumLng = 0;
  flatPts.forEach(([lat, lng]) => {
    sumLat += lat;
    sumLng += lng;
  });

  return {
    center: [sumLat / flatPts.length, sumLng / flatPts.length],
    coords: flatPts
  };
}

