// Dataset Spasial Negeri Sembilan (Negeri Sembilan GIS Data)
// Pusat Koordinat N.S.: Lat 2.7258, Lng 101.9424 (Seremban / Central N.S.)

export const NEGERI_SEMBILAN_BOUNDS = {
  center: [2.7200, 102.1500],
  zoom: 10,
  districts: [
    'Seremban',
    'Jempol',
    'Port Dickson',
    'Kuala Pilah',
    'Jelebu',
    'Rembau',
    'Tampin'
  ]
};

// Sempadan Rasmi Negeri Sembilan Darul Khusus (DOSM & JUPEM Official Boundary)
export const SEMPADAN_NEGERI_SEMBILAN = {
  type: 'Feature',
  properties: {
    kod: '05',
    deskripsi: 'Sempadan Rasmi Pentadbiran Negeri Sembilan (JUPEM / DOSM)',
    punca: 'Jabatan Ukur dan Pemetaan Malaysia (JUPEM)'
  },
  geometry: {"type":"MultiPolygon","coordinates":[[[[102.62481,2.62871],[102.62382,2.62517],[102.62611,2.62095],[102.62482,2.61653],[102.62917,2.60944],[102.63344,2.60949],[102.63762,2.60586],[102.63833,2.59993],[102.6361,2.59777],[102.63745,2.59519],[102.63348,2.59272],[102.63079,2.58272],[102.62844,2.5872],[102.62355,2.58548],[102.62298,2.58109],[102.61626,2.57759],[102.61628,2.57425],[102.61357,2.57148],[102.61273,2.56794],[102.60724,2.56387],[102.60763,2.55981],[102.6105,2.55878],[102.61318,2.5519],[102.61247,2.5501],[102.60915,2.54902],[102.61106,2.54612],[102.60797,2.54099],[102.60911,2.53331],[102.61087,2.53147],[102.61181,2.52612],[102.61902,2.51657],[102.61166,2.50795],[102.60631,2.50549],[102.6068,2.50314],[102.60429,2.49766],[102.60634,2.48806],[102.60956,2.48654],[102.60989,2.48422],[102.61314,2.48195],[102.61452,2.47571],[102.6136,2.47331],[102.61568,2.46898],[102.61475,2.46471],[102.60326,2.4604],[102.60301,2.45562],[102.60043,2.45552],[102.59454,2.45051],[102.59356,2.4406],[102.59162,2.43625],[102.59289,2.43202],[102.58938,2.42391],[102.59062,2.41687],[102.59237,2.41597],[102.59322,2.41257],[102.59225,2.40541],[102.58544,2.41195],[102.55728,2.41621],[102.5076,2.43402],[102.43106,2.4538],[102.43118,2.45564],[102.42891,2.45633],[102.42925,2.46369],[102.41195,2.47219],[102.36238,2.48769],[102.31869,2.47865],[102.27384,2.45655],[102.22889,2.46478],[102.20625,2.48012],[102.20129,2.48018],[102.19991,2.48264],[102.19317,2.48513],[102.18795,2.4912],[102.17371,2.49766],[102.13939,2.45637],[102.11888,2.46145],[102.08553,2.44603],[102.08274,2.45146],[102.07911,2.45385],[102.07525,2.45313],[102.06777,2.45716],[102.0625,2.4559],[102.06027,2.45278],[102.06013,2.44739],[102.05823,2.44359],[102.05871,2.44211],[102.06279,2.4422],[102.06318,2.44086],[102.05838,2.43375],[102.05031,2.43362],[102.04727,2.42722],[102.04926,2.42269],[102.04799,2.41981],[102.03947,2.42039],[102.03425,2.42465],[102.03306,2.42837],[102.03536,2.43379],[102.02983,2.43921],[102.02683,2.42814],[102.01177,2.4091],[101.99489,2.39985],[101.98279,2.39546],[101.97681,2.38959],[101.97413,2.39138],[101.97057,2.39846],[101.95678,2.40269],[101.9442,2.40887],[101.93906,2.41895],[101.93533,2.4221],[101.92857,2.42386],[101.91915,2.42324],[101.91761,2.42091],[101.91225,2.42295],[101.90681,2.422],[101.90344,2.41986],[101.90338,2.41813],[101.89614,2.41488],[101.88014,2.41894],[101.87583,2.41748],[101.86718,2.41793],[101.85993,2.41414],[101.85667,2.41505],[101.85771,2.42889],[101.85436,2.44472],[101.85462,2.45162],[101.8512,2.46108],[101.84971,2.46236],[101.84813,2.46152],[101.84704,2.46356],[101.84752,2.47017],[101.85223,2.47217],[101.85016,2.47538],[101.84641,2.47519],[101.84584,2.48227],[101.83934,2.49152],[101.83608,2.50182],[101.82918,2.5072],[101.82421,2.51571],[101.81377,2.5233],[101.79849,2.51996],[101.7958,2.52156],[101.79693,2.5148],[101.79279,2.51479],[101.79277,2.52234],[101.79183,2.52063],[101.79038,2.52113],[101.7892,2.52806],[101.79069,2.53342],[101.79312,2.53473],[101.78454,2.5455],[101.78679,2.54813],[101.79258,2.5456],[101.79845,2.54543],[101.79417,2.55377],[101.79994,2.5616],[101.79522,2.57465],[101.79088,2.57805],[101.79126,2.58113],[101.78715,2.57658],[101.78461,2.57695],[101.78202,2.58701],[101.7737,2.59437],[101.75477,2.60274],[101.74231,2.60299],[101.72385,2.59583],[101.70905,2.59681],[101.70974,2.60216],[101.70244,2.60664],[101.70126,2.61008],[101.70717,2.61722],[101.71933,2.62415],[101.72244,2.62369],[101.72575,2.6202],[101.72798,2.62056],[101.72892,2.62883],[101.72341,2.63928],[101.72428,2.64278],[101.72908,2.64934],[101.7454,2.65765],[101.74322,2.66881],[101.73882,2.67244],[101.73867,2.67658],[101.7453,2.68443],[101.75116,2.68612],[101.75014,2.68939],[101.75349,2.70075],[101.75839,2.70238],[101.76121,2.70694],[101.74993,2.87321],[101.88177,2.86999],[101.92294,2.96757],[101.92415,2.97603],[101.92949,2.98268],[101.92962,2.9913],[101.93197,3.00133],[101.93998,3.0014],[101.9429,3.00827],[101.94016,3.01538],[101.94079,3.01918],[101.94673,3.01988],[101.95706,3.02877],[101.96216,3.02712],[101.965,3.02936],[101.96865,3.02848],[101.97075,3.0325],[101.96773,3.04875],[101.96535,3.05282],[101.96771,3.06033],[101.96075,3.06408],[101.96329,3.08021],[101.95905,3.08346],[101.95549,3.09935],[101.94969,3.10823],[101.94944,3.11489],[101.95705,3.11824],[101.9622,3.12676],[101.96218,3.13666],[101.96545,3.14352],[101.95743,3.15053],[101.95719,3.15772],[101.94721,3.1712],[101.94385,3.18491],[101.93984,3.18992],[101.94701,3.19855],[101.94504,3.2097],[101.94856,3.21224],[101.94552,3.22744],[101.93795,3.24101],[101.92935,3.24877],[101.93178,3.2552],[101.93076,3.25717],[101.92666,3.25848],[101.92258,3.2639],[101.91732,3.26339],[101.92297,3.26915],[101.92738,3.27013],[101.93304,3.27536],[101.93694,3.28874],[101.94045,3.28982],[101.94845,3.28523],[101.95654,3.27342],[101.96549,3.27596],[101.97254,3.2739],[101.97362,3.26264],[101.97779,3.25403],[101.97749,3.24962],[101.97456,3.2459],[101.98531,3.23761],[101.99267,3.23832],[102.00055,3.23124],[102.00931,3.22732],[102.01292,3.22749],[102.01892,3.23081],[102.02306,3.23012],[102.0279,3.23158],[102.03216,3.22829],[102.03904,3.22865],[102.04428,3.22627],[102.05082,3.21228],[102.05175,3.20253],[102.05491,3.1978],[102.05135,3.19065],[102.05217,3.18562],[102.05566,3.18039],[102.05482,3.17257],[102.05668,3.16894],[102.05938,3.16761],[102.06933,3.17204],[102.07454,3.16686],[102.07519,3.1757],[102.07774,3.18111],[102.08052,3.1832],[102.08426,3.18263],[102.09672,3.1927],[102.10685,3.19298],[102.11314,3.18904],[102.11526,3.19072],[102.11534,3.19858],[102.12186,3.19971],[102.12752,3.19419],[102.14175,3.19837],[102.15066,3.18982],[102.15147,3.18559],[102.15522,3.18443],[102.15898,3.17909],[102.29251,3.13744],[102.38901,3.11847],[102.46634,3.01947],[102.66625,2.88541],[102.67407,2.89361],[102.67534,2.89755],[102.67978,2.89561],[102.68063,2.89207],[102.6846,2.88861],[102.68438,2.88575],[102.68807,2.88358],[102.6874,2.8788],[102.68971,2.88055],[102.69038,2.87755],[102.69231,2.87715],[102.69292,2.85969],[102.69448,2.8582],[102.69385,2.85367],[102.69605,2.85234],[102.69407,2.8481],[102.69469,2.84488],[102.69243,2.84289],[102.69742,2.83525],[102.69507,2.8321],[102.6997,2.83246],[102.62481,2.62871]]]]},
  coordinates: [
  [
    2.62871,
    102.62481
  ],
  [
    2.62517,
    102.62382
  ],
  [
    2.62095,
    102.62611
  ],
  [
    2.61653,
    102.62482
  ],
  [
    2.60944,
    102.62917
  ],
  [
    2.60949,
    102.63344
  ],
  [
    2.60586,
    102.63762
  ],
  [
    2.59993,
    102.63833
  ],
  [
    2.59777,
    102.6361
  ],
  [
    2.59519,
    102.63745
  ],
  [
    2.59272,
    102.63348
  ],
  [
    2.58272,
    102.63079
  ],
  [
    2.5872,
    102.62844
  ],
  [
    2.58548,
    102.62355
  ],
  [
    2.58109,
    102.62298
  ],
  [
    2.57759,
    102.61626
  ],
  [
    2.57425,
    102.61628
  ],
  [
    2.57148,
    102.61357
  ],
  [
    2.56794,
    102.61273
  ],
  [
    2.56387,
    102.60724
  ],
  [
    2.55981,
    102.60763
  ],
  [
    2.55878,
    102.6105
  ],
  [
    2.5519,
    102.61318
  ],
  [
    2.5501,
    102.61247
  ],
  [
    2.54902,
    102.60915
  ],
  [
    2.54612,
    102.61106
  ],
  [
    2.54099,
    102.60797
  ],
  [
    2.53331,
    102.60911
  ],
  [
    2.53147,
    102.61087
  ],
  [
    2.52612,
    102.61181
  ],
  [
    2.51657,
    102.61902
  ],
  [
    2.50795,
    102.61166
  ],
  [
    2.50549,
    102.60631
  ],
  [
    2.50314,
    102.6068
  ],
  [
    2.49766,
    102.60429
  ],
  [
    2.48806,
    102.60634
  ],
  [
    2.48654,
    102.60956
  ],
  [
    2.48422,
    102.60989
  ],
  [
    2.48195,
    102.61314
  ],
  [
    2.47571,
    102.61452
  ],
  [
    2.47331,
    102.6136
  ],
  [
    2.46898,
    102.61568
  ],
  [
    2.46471,
    102.61475
  ],
  [
    2.4604,
    102.60326
  ],
  [
    2.45562,
    102.60301
  ],
  [
    2.45552,
    102.60043
  ],
  [
    2.45051,
    102.59454
  ],
  [
    2.4406,
    102.59356
  ],
  [
    2.43625,
    102.59162
  ],
  [
    2.43202,
    102.59289
  ],
  [
    2.42391,
    102.58938
  ],
  [
    2.41687,
    102.59062
  ],
  [
    2.41597,
    102.59237
  ],
  [
    2.41257,
    102.59322
  ],
  [
    2.40541,
    102.59225
  ],
  [
    2.41195,
    102.58544
  ],
  [
    2.41621,
    102.55728
  ],
  [
    2.43402,
    102.5076
  ],
  [
    2.4538,
    102.43106
  ],
  [
    2.45564,
    102.43118
  ],
  [
    2.45633,
    102.42891
  ],
  [
    2.46369,
    102.42925
  ],
  [
    2.47219,
    102.41195
  ],
  [
    2.48769,
    102.36238
  ],
  [
    2.47865,
    102.31869
  ],
  [
    2.45655,
    102.27384
  ],
  [
    2.46478,
    102.22889
  ],
  [
    2.48012,
    102.20625
  ],
  [
    2.48018,
    102.20129
  ],
  [
    2.48264,
    102.19991
  ],
  [
    2.48513,
    102.19317
  ],
  [
    2.4912,
    102.18795
  ],
  [
    2.49766,
    102.17371
  ],
  [
    2.45637,
    102.13939
  ],
  [
    2.46145,
    102.11888
  ],
  [
    2.44603,
    102.08553
  ],
  [
    2.45146,
    102.08274
  ],
  [
    2.45385,
    102.07911
  ],
  [
    2.45313,
    102.07525
  ],
  [
    2.45716,
    102.06777
  ],
  [
    2.4559,
    102.0625
  ],
  [
    2.45278,
    102.06027
  ],
  [
    2.44739,
    102.06013
  ],
  [
    2.44359,
    102.05823
  ],
  [
    2.44211,
    102.05871
  ],
  [
    2.4422,
    102.06279
  ],
  [
    2.44086,
    102.06318
  ],
  [
    2.43375,
    102.05838
  ],
  [
    2.43362,
    102.05031
  ],
  [
    2.42722,
    102.04727
  ],
  [
    2.42269,
    102.04926
  ],
  [
    2.41981,
    102.04799
  ],
  [
    2.42039,
    102.03947
  ],
  [
    2.42465,
    102.03425
  ],
  [
    2.42837,
    102.03306
  ],
  [
    2.43379,
    102.03536
  ],
  [
    2.43921,
    102.02983
  ],
  [
    2.42814,
    102.02683
  ],
  [
    2.4091,
    102.01177
  ],
  [
    2.39985,
    101.99489
  ],
  [
    2.39546,
    101.98279
  ],
  [
    2.38959,
    101.97681
  ],
  [
    2.39138,
    101.97413
  ],
  [
    2.39846,
    101.97057
  ],
  [
    2.40269,
    101.95678
  ],
  [
    2.40887,
    101.9442
  ],
  [
    2.41895,
    101.93906
  ],
  [
    2.4221,
    101.93533
  ],
  [
    2.42386,
    101.92857
  ],
  [
    2.42324,
    101.91915
  ],
  [
    2.42091,
    101.91761
  ],
  [
    2.42295,
    101.91225
  ],
  [
    2.422,
    101.90681
  ],
  [
    2.41986,
    101.90344
  ],
  [
    2.41813,
    101.90338
  ],
  [
    2.41488,
    101.89614
  ],
  [
    2.41894,
    101.88014
  ],
  [
    2.41748,
    101.87583
  ],
  [
    2.41793,
    101.86718
  ],
  [
    2.41414,
    101.85993
  ],
  [
    2.41505,
    101.85667
  ],
  [
    2.42889,
    101.85771
  ],
  [
    2.44472,
    101.85436
  ],
  [
    2.45162,
    101.85462
  ],
  [
    2.46108,
    101.8512
  ],
  [
    2.46236,
    101.84971
  ],
  [
    2.46152,
    101.84813
  ],
  [
    2.46356,
    101.84704
  ],
  [
    2.47017,
    101.84752
  ],
  [
    2.47217,
    101.85223
  ],
  [
    2.47538,
    101.85016
  ],
  [
    2.47519,
    101.84641
  ],
  [
    2.48227,
    101.84584
  ],
  [
    2.49152,
    101.83934
  ],
  [
    2.50182,
    101.83608
  ],
  [
    2.5072,
    101.82918
  ],
  [
    2.51571,
    101.82421
  ],
  [
    2.5233,
    101.81377
  ],
  [
    2.51996,
    101.79849
  ],
  [
    2.52156,
    101.7958
  ],
  [
    2.5148,
    101.79693
  ],
  [
    2.51479,
    101.79279
  ],
  [
    2.52234,
    101.79277
  ],
  [
    2.52063,
    101.79183
  ],
  [
    2.52113,
    101.79038
  ],
  [
    2.52806,
    101.7892
  ],
  [
    2.53342,
    101.79069
  ],
  [
    2.53473,
    101.79312
  ],
  [
    2.5455,
    101.78454
  ],
  [
    2.54813,
    101.78679
  ],
  [
    2.5456,
    101.79258
  ],
  [
    2.54543,
    101.79845
  ],
  [
    2.55377,
    101.79417
  ],
  [
    2.5616,
    101.79994
  ],
  [
    2.57465,
    101.79522
  ],
  [
    2.57805,
    101.79088
  ],
  [
    2.58113,
    101.79126
  ],
  [
    2.57658,
    101.78715
  ],
  [
    2.57695,
    101.78461
  ],
  [
    2.58701,
    101.78202
  ],
  [
    2.59437,
    101.7737
  ],
  [
    2.60274,
    101.75477
  ],
  [
    2.60299,
    101.74231
  ],
  [
    2.59583,
    101.72385
  ],
  [
    2.59681,
    101.70905
  ],
  [
    2.60216,
    101.70974
  ],
  [
    2.60664,
    101.70244
  ],
  [
    2.61008,
    101.70126
  ],
  [
    2.61722,
    101.70717
  ],
  [
    2.62415,
    101.71933
  ],
  [
    2.62369,
    101.72244
  ],
  [
    2.6202,
    101.72575
  ],
  [
    2.62056,
    101.72798
  ],
  [
    2.62883,
    101.72892
  ],
  [
    2.63928,
    101.72341
  ],
  [
    2.64278,
    101.72428
  ],
  [
    2.64934,
    101.72908
  ],
  [
    2.65765,
    101.7454
  ],
  [
    2.66881,
    101.74322
  ],
  [
    2.67244,
    101.73882
  ],
  [
    2.67658,
    101.73867
  ],
  [
    2.68443,
    101.7453
  ],
  [
    2.68612,
    101.75116
  ],
  [
    2.68939,
    101.75014
  ],
  [
    2.70075,
    101.75349
  ],
  [
    2.70238,
    101.75839
  ],
  [
    2.70694,
    101.76121
  ],
  [
    2.87321,
    101.74993
  ],
  [
    2.86999,
    101.88177
  ],
  [
    2.96757,
    101.92294
  ],
  [
    2.97603,
    101.92415
  ],
  [
    2.98268,
    101.92949
  ],
  [
    2.9913,
    101.92962
  ],
  [
    3.00133,
    101.93197
  ],
  [
    3.0014,
    101.93998
  ],
  [
    3.00827,
    101.9429
  ],
  [
    3.01538,
    101.94016
  ],
  [
    3.01918,
    101.94079
  ],
  [
    3.01988,
    101.94673
  ],
  [
    3.02877,
    101.95706
  ],
  [
    3.02712,
    101.96216
  ],
  [
    3.02936,
    101.965
  ],
  [
    3.02848,
    101.96865
  ],
  [
    3.0325,
    101.97075
  ],
  [
    3.04875,
    101.96773
  ],
  [
    3.05282,
    101.96535
  ],
  [
    3.06033,
    101.96771
  ],
  [
    3.06408,
    101.96075
  ],
  [
    3.08021,
    101.96329
  ],
  [
    3.08346,
    101.95905
  ],
  [
    3.09935,
    101.95549
  ],
  [
    3.10823,
    101.94969
  ],
  [
    3.11489,
    101.94944
  ],
  [
    3.11824,
    101.95705
  ],
  [
    3.12676,
    101.9622
  ],
  [
    3.13666,
    101.96218
  ],
  [
    3.14352,
    101.96545
  ],
  [
    3.15053,
    101.95743
  ],
  [
    3.15772,
    101.95719
  ],
  [
    3.1712,
    101.94721
  ],
  [
    3.18491,
    101.94385
  ],
  [
    3.18992,
    101.93984
  ],
  [
    3.19855,
    101.94701
  ],
  [
    3.2097,
    101.94504
  ],
  [
    3.21224,
    101.94856
  ],
  [
    3.22744,
    101.94552
  ],
  [
    3.24101,
    101.93795
  ],
  [
    3.24877,
    101.92935
  ],
  [
    3.2552,
    101.93178
  ],
  [
    3.25717,
    101.93076
  ],
  [
    3.25848,
    101.92666
  ],
  [
    3.2639,
    101.92258
  ],
  [
    3.26339,
    101.91732
  ],
  [
    3.26915,
    101.92297
  ],
  [
    3.27013,
    101.92738
  ],
  [
    3.27536,
    101.93304
  ],
  [
    3.28874,
    101.93694
  ],
  [
    3.28982,
    101.94045
  ],
  [
    3.28523,
    101.94845
  ],
  [
    3.27342,
    101.95654
  ],
  [
    3.27596,
    101.96549
  ],
  [
    3.2739,
    101.97254
  ],
  [
    3.26264,
    101.97362
  ],
  [
    3.25403,
    101.97779
  ],
  [
    3.24962,
    101.97749
  ],
  [
    3.2459,
    101.97456
  ],
  [
    3.23761,
    101.98531
  ],
  [
    3.23832,
    101.99267
  ],
  [
    3.23124,
    102.00055
  ],
  [
    3.22732,
    102.00931
  ],
  [
    3.22749,
    102.01292
  ],
  [
    3.23081,
    102.01892
  ],
  [
    3.23012,
    102.02306
  ],
  [
    3.23158,
    102.0279
  ],
  [
    3.22829,
    102.03216
  ],
  [
    3.22865,
    102.03904
  ],
  [
    3.22627,
    102.04428
  ],
  [
    3.21228,
    102.05082
  ],
  [
    3.20253,
    102.05175
  ],
  [
    3.1978,
    102.05491
  ],
  [
    3.19065,
    102.05135
  ],
  [
    3.18562,
    102.05217
  ],
  [
    3.18039,
    102.05566
  ],
  [
    3.17257,
    102.05482
  ],
  [
    3.16894,
    102.05668
  ],
  [
    3.16761,
    102.05938
  ],
  [
    3.17204,
    102.06933
  ],
  [
    3.16686,
    102.07454
  ],
  [
    3.1757,
    102.07519
  ],
  [
    3.18111,
    102.07774
  ],
  [
    3.1832,
    102.08052
  ],
  [
    3.18263,
    102.08426
  ],
  [
    3.1927,
    102.09672
  ],
  [
    3.19298,
    102.10685
  ],
  [
    3.18904,
    102.11314
  ],
  [
    3.19072,
    102.11526
  ],
  [
    3.19858,
    102.11534
  ],
  [
    3.19971,
    102.12186
  ],
  [
    3.19419,
    102.12752
  ],
  [
    3.19837,
    102.14175
  ],
  [
    3.18982,
    102.15066
  ],
  [
    3.18559,
    102.15147
  ],
  [
    3.18443,
    102.15522
  ],
  [
    3.17909,
    102.15898
  ],
  [
    3.13744,
    102.29251
  ],
  [
    3.11847,
    102.38901
  ],
  [
    3.01947,
    102.46634
  ],
  [
    2.88541,
    102.66625
  ],
  [
    2.89361,
    102.67407
  ],
  [
    2.89755,
    102.67534
  ],
  [
    2.89561,
    102.67978
  ],
  [
    2.89207,
    102.68063
  ],
  [
    2.88861,
    102.6846
  ],
  [
    2.88575,
    102.68438
  ],
  [
    2.88358,
    102.68807
  ],
  [
    2.8788,
    102.6874
  ],
  [
    2.88055,
    102.68971
  ],
  [
    2.87755,
    102.69038
  ],
  [
    2.87715,
    102.69231
  ],
  [
    2.85969,
    102.69292
  ],
  [
    2.8582,
    102.69448
  ],
  [
    2.85367,
    102.69385
  ],
  [
    2.85234,
    102.69605
  ],
  [
    2.8481,
    102.69407
  ],
  [
    2.84488,
    102.69469
  ],
  [
    2.84289,
    102.69243
  ],
  [
    2.83525,
    102.69742
  ],
  [
    2.8321,
    102.69507
  ],
  [
    2.83246,
    102.6997
  ],
  [
    2.62871,
    102.62481
  ]
]
};

// 1. TANAH RIZAB MELAYU (TRM) NEGERI SEMBILAN SAMPLE CURATED
export const RIZAB_MELAYU_NS = {
  type: 'FeatureCollection',
  name: 'Tanah Rizab Melayu Negeri Sembilan',
  features: [
    {
      type: 'Feature',
      id: 'trm-ns-001',
      properties: {
        id: 'TRM-NS-001',
        nama: 'Rizab Melayu Ampangan',
        noLot: 'Lot 3481 & Lot 3482',
        mukim: 'Mukim Ampangan',
        daerah: 'Seremban',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 412/1932',
        tarikhWarta: '15 Ogos 1932',
        luasHektar: 142.5,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Pertanian & Kediaman',
        deskripsi: 'Kawasan Rizab Melayu tradisi Mukim Ampangan berhampiran Paroi.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [101.965, 2.715],
          [101.985, 2.718],
          [101.990, 2.700],
          [101.970, 2.695],
          [101.965, 2.715]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-002',
      properties: {
        id: 'TRM-NS-002',
        nama: 'Rizab Melayu Rasah & Mambau',
        noLot: 'Lot 1204 - Lot 1220',
        mukim: 'Mukim Rasah',
        daerah: 'Seremban',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 889/1954',
        tarikhWarta: '22 April 1954',
        luasHektar: 98.2,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Kediaman Campuran',
        deskripsi: 'Rizab Melayu Mukim Rasah meliputi penempatan Mambau dan Mambau Jaya.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [101.910, 2.680],
          [101.930, 2.685],
          [101.935, 2.665],
          [101.912, 2.660],
          [101.910, 2.680]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-003',
      properties: {
        id: 'TRM-NS-003',
        nama: 'Rizab Melayu Jimah & Chuah',
        noLot: 'Lot 5012 & PT 890',
        mukim: 'Mukim Jimah',
        daerah: 'Port Dickson',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 104/1962',
        tarikhWarta: '11 Februari 1962',
        luasHektar: 215.8,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Pertanian (Kelapa Sawit & Dusun)',
        deskripsi: 'Kawasan pertanian Rizab Melayu Jimah berdekatan Lukut dan Sepang.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [101.810, 2.600],
          [101.835, 2.610],
          [101.840, 2.585],
          [101.815, 2.580],
          [101.810, 2.600]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-004',
      properties: {
        id: 'TRM-NS-004',
        nama: 'Rizab Melayu Juasseh',
        noLot: 'Lot 892 - Lot 910',
        mukim: 'Mukim Juasseh',
        daerah: 'Kuala Pilah',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 310/1948',
        tarikhWarta: '05 September 1948',
        luasHektar: 310.4,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Pertanian (Sawah Padi & Getah)',
        deskripsi: 'Lembah Sawah Padi dan perkampungan adat Terachi/Juasseh.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.260, 2.780],
          [102.290, 2.785],
          [102.295, 2.760],
          [102.265, 2.755],
          [102.260, 2.780]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-005',
      properties: {
        id: 'TRM-NS-005',
        nama: 'Rizab Melayu Serting Ilir',
        noLot: 'Lot 4401 - Lot 4450',
        mukim: 'Mukim Serting Ilir',
        daerah: 'Jempol',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 762/1971',
        tarikhWarta: '14 Disember 1971',
        luasHektar: 420.0,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Pertanian Komoditi',
        deskripsi: 'Zon Rizab Melayu terbesar daerah Jempol berdekatan Bandar Seri Jempol.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.390, 2.820],
          [102.430, 2.825],
          [102.435, 2.790],
          [102.395, 2.785],
          [102.390, 2.820]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-006',
      properties: {
        id: 'TRM-NS-006',
        nama: 'Rizab Melayu Chembong',
        noLot: 'Lot 1500 - Lot 1540',
        mukim: 'Mukim Chembong',
        daerah: 'Rembau',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 215/1938',
        tarikhWarta: '08 Julai 1938',
        luasHektar: 185.3,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Kediaman Adat & Dusun',
        deskripsi: 'Tanah Adat Perpatih / Rizab Melayu Chembong & Pedas.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.080, 2.550],
          [102.105, 2.555],
          [102.110, 2.530],
          [102.085, 2.525],
          [102.080, 2.550]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-007',
      properties: {
        id: 'TRM-NS-007',
        nama: 'Rizab Melayu Repah & Gemas',
        noLot: 'Lot 8810 - Lot 8890',
        mukim: 'Mukim Repah',
        daerah: 'Tampin',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 550/1959',
        tarikhWarta: '19 November 1959',
        luasHektar: 260.9,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Pertanian & Komuniti',
        deskripsi: 'Kawasan Rizab Melayu Repah bersebelahan Bandar Tampin.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.220, 2.480],
          [102.250, 2.485],
          [102.255, 2.455],
          [102.225, 2.450],
          [102.220, 2.480]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'trm-ns-008',
      properties: {
        id: 'TRM-NS-008',
        nama: 'Rizab Melayu Kuala Klawang & Triang',
        noLot: 'Lot 2290 - Lot 2310',
        mukim: 'Mukim Kuala Klawang',
        daerah: 'Jelebu',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 839/1990',
        tarikhWarta: '03 Jun 1990',
        luasHektar: 280.5,
        status: 'Aktif (Gazetted)',
        kategoriSyarat: 'Pertanian & Perkampungan',
        deskripsi: 'Kawasan Rizab Melayu Jelebu meliputi lembah Sungai Triang.'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.040, 2.940],
          [102.070, 2.945],
          [102.075, 2.915],
          [102.045, 2.910],
          [102.040, 2.940]
        ]]
      }
    }
  ]
};

// 2. HUTAN SIMPAN KEKAL (RIZAB HUTAN) NEGERI SEMBILAN
export const HUTAN_SIMPAN_NS = {
  type: 'FeatureCollection',
  name: 'Hutan Simpan Kekal Negeri Sembilan',
  features: [
    {
      type: 'Feature',
      id: 'hsk-ns-001',
      properties: {
        id: 'HSK-NS-001',
        nama: 'Hutan Simpan Berembun',
        jenis: 'Hutan Perlindungan & Hutan Pelancongan',
        daerahHutan: 'Seremban & Jelebu',
        negeri: 'Negeri Sembilan',
        noWarta: 'PW N.S. 12/1923',
        tarikhWarta: '14 Mac 1923',
        luasHektar: 4230.0,
        status: 'Hutan Simpan Kekal (HSK)',
        spesiesUtama: 'Meranti, Keruing, Pelanginan',
        ketinggianMax: '1,014m (Gunung Berembun)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.000, 2.760],
          [102.050, 2.790],
          [102.070, 2.740],
          [102.020, 2.710],
          [102.000, 2.760]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'hsk-ns-002',
      properties: {
        id: 'HSK-NS-002',
        nama: 'Hutan Simpan Pasoh',
        jenis: 'Hutan Penyelidikan & Perlindungan Biodiversiti',
        daerahHutan: 'Jempol',
        negeri: 'Negeri Sembilan',
        noWarta: 'PW N.S. 88/1930',
        tarikhWarta: '01 Ogos 1930',
        luasHektar: 2450.8,
        status: 'Hutan Simpan Kekal (Tapak Penyelidikan FRIM)',
        spesiesUtama: 'Dipterokarpa Lowland, Chengal, Balau',
        ketinggianMax: '650m'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.280, 2.950],
          [102.340, 2.970],
          [102.360, 2.920],
          [102.300, 2.900],
          [102.280, 2.950]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'hsk-ns-003',
      properties: {
        id: 'HSK-NS-003',
        nama: 'Hutan Simpan Gunong Angsi',
        jenis: 'Hutan Pelindungan Tadahan Air & Rekreasi',
        daerahHutan: 'Seremban / Rembau',
        negeri: 'Negeri Sembilan',
        noWarta: 'PW N.S. 05/1918',
        tarikhWarta: '10 Mei 1918',
        luasHektar: 3120.5,
        status: 'Hutan Simpan Kekal (HSK)',
        spesiesUtama: 'Damar Minyak, Seraya, Jelutong',
        ketinggianMax: '825m (Gunung Angsi)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.010, 2.680],
          [102.050, 2.690],
          [102.060, 2.640],
          [102.020, 2.630],
          [102.010, 2.680]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'hsk-ns-004',
      properties: {
        id: 'HSK-NS-004',
        nama: 'Hutan Simpan Sungai Menyala',
        jenis: 'Hutan Dataran Rendah & Hutan Lipur',
        daerahHutan: 'Port Dickson',
        negeri: 'Negeri Sembilan',
        noWarta: 'PW N.S. 44/1951',
        tarikhWarta: '30 Oktober 1951',
        luasHektar: 1280.0,
        status: 'Hutan Simpan Kekal (Pusat Eko-Pelajaran)',
        spesiesUtama: 'Kempas, Keruing, Jelutong Gergasi',
        ketinggianMax: '120m'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [101.880, 2.470],
          [101.910, 2.485],
          [101.920, 2.450],
          [101.890, 2.440],
          [101.880, 2.470]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'hsk-ns-005',
      properties: {
        id: 'HSK-NS-005',
        nama: 'Hutan Simpan Kenaboi & Triang',
        jenis: 'Hutan Tadahan Air & Perlindungan Liar',
        daerahHutan: 'Jelebu',
        negeri: 'Negeri Sembilan',
        noWarta: 'PW N.S. 09/1935',
        tarikhWarta: '18 Januari 1935',
        luasHektar: 8940.0,
        status: 'Hutan Simpan Kekal (HSK Taman Negeri Kenaboi)',
        spesiesUtama: 'Meranti Seraya, Kasai, Bintangor',
        ketinggianMax: '1,462m (Gunung Telapak Burok)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [101.980, 3.020],
          [102.080, 3.060],
          [102.120, 2.980],
          [102.020, 2.950],
          [101.980, 3.020]
        ]]
      }
    }
  ]
};

// 3. RIZAB ORANG ASLI NEGERI SEMBILAN
export const RIZAB_ORANG_ASLI_NS = {
  type: 'FeatureCollection',
  name: 'Rizab Orang Asli Negeri Sembilan',
  features: [
    {
      type: 'Feature',
      id: 'roa-ns-001',
      properties: {
        id: 'ROA-NS-001',
        nama: 'Perkampungan Orang Asli Bukit Kepayang / Labu',
        sukuKaum: 'Temuan',
        daerah: 'Seremban',
        mukim: 'Mukim Labu',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 112/1968',
        tarikhWarta: '04 April 1968',
        luasHektar: 85.4,
        pendudukAnggaran: 420,
        status: 'Warta Persekutuan (JAKOA)',
        kemudahan: 'Balai Raya, Sekolah Kebangsaan, Surau, Pusat Komuniti'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [101.880, 2.730],
          [101.900, 2.735],
          [101.905, 2.715],
          [101.885, 2.710],
          [101.880, 2.730]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'roa-ns-002',
      properties: {
        id: 'ROA-NS-002',
        nama: 'Perkampungan Orang Asli Guntung & Duson Tua',
        sukuKaum: 'Temuan',
        daerah: 'Jelebu',
        mukim: 'Mukim Ulu Klawang',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 408/1974',
        tarikhWarta: '12 September 1974',
        luasHektar: 140.2,
        pendudukAnggaran: 680,
        status: 'Warta Persekutuan (JAKOA)',
        kemudahan: 'Pusat Kesihatan Desa, Tadika Kemas, Dewan Serbaguna'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.040, 2.920],
          [102.065, 2.930],
          [102.070, 2.900],
          [102.045, 2.895],
          [102.040, 2.920]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'roa-ns-003',
      properties: {
        id: 'ROA-NS-003',
        nama: 'Perkampungan Orang Asli Sungai Sampo',
        sukuKaum: 'Semai & Temuan',
        daerah: 'Jempol',
        mukim: 'Mukim Serting Ulu',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 220/1982',
        tarikhWarta: '28 Mei 1982',
        luasHektar: 295.6,
        pendudukAnggaran: 1150,
        status: 'Warta Persekutuan (JAKOA)',
        kemudahan: 'Sekolah SK Sungai Sampo, Klinik Desa, Medan Usahawan'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.310, 2.880],
          [102.345, 2.890],
          [102.350, 2.855],
          [102.315, 2.850],
          [102.310, 2.880]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'roa-ns-004',
      properties: {
        id: 'ROA-NS-004',
        nama: 'Perkampungan Orang Asli Langkap & Ulu Johol',
        sukuKaum: 'Temuan',
        daerah: 'Kuala Pilah',
        mukim: 'Mukim Johol',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 512/1979',
        tarikhWarta: '14 Ogos 1979',
        luasHektar: 198.0,
        pendudukAnggaran: 540,
        status: 'Warta Persekutuan (JAKOA)',
        kemudahan: 'Balai Pengajian, Bekalan Air Graviti, Dewan Komuniti'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.180, 2.610],
          [102.210, 2.620],
          [102.215, 2.590],
          [102.185, 2.585],
          [102.180, 2.610]
        ]]
      }
    },
    {
      type: 'Feature',
      id: 'roa-ns-005',
      properties: {
        id: 'ROA-NS-005',
        nama: 'Perkampungan Orang Asli Tebong & Air Kuning',
        sukuKaum: 'Temuan',
        daerah: 'Tampin',
        mukim: 'Mukim Air Kuning',
        negeri: 'Negeri Sembilan',
        noWarta: 'G.N. N.S. 604/1985',
        tarikhWarta: '03 Disember 1985',
        luasHektar: 112.3,
        pendudukAnggaran: 390,
        status: 'Warta Persekutuan (JAKOA)',
        kemudahan: 'Dewan Orang Asli Tebong, Projek Tani Jakoa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [102.300, 2.510],
          [102.325, 2.520],
          [102.330, 2.495],
          [102.305, 2.490],
          [102.300, 2.510]
        ]]
      }
    }
  ]
};

// Ringkasan Statistik Rasmi 7 Daerah Negeri Sembilan
export const SUMMARY_STATS_NS = {
  totalRizabMelayuPoligon: 255,
  totalPembatalanPoligon: 86,
  totalPenggantianPoligon: 11,
  totalHutanSimpanPoligon: 330,
  totalOrangAsliPoligon: 53,
  totalLotKadaster: 624426,
  daerahList: [
    { id: 'seremban', nama: 'Seremban', rmPoligon: 48, pmbPoligon: 16, ganPoligon: 0, roaPoligon: 3, lotCount: 279467, rmHektar: 4820, hskHektar: 12450, roaHektar: 320 },
    { id: 'jempol', nama: 'Jempol', rmPoligon: 60, pmbPoligon: 20, ganPoligon: 5, roaPoligon: 18, lotCount: 65228, rmHektar: 14250, hskHektar: 28900, roaHektar: 1450 },
    { id: 'pd', nama: 'Port Dickson', rmPoligon: 32, pmbPoligon: 7, ganPoligon: 1, roaPoligon: 1, lotCount: 64565, rmHektar: 2150, hskHektar: 1820, roaHektar: 85 },
    { id: 'kualapilah', nama: 'Kuala Pilah', rmPoligon: 30, pmbPoligon: 18, ganPoligon: 2, roaPoligon: 9, lotCount: 56507, rmHektar: 8920, hskHektar: 15400, roaHektar: 580 },
    { id: 'tampin', nama: 'Tampin', rmPoligon: 22, pmbPoligon: 8, ganPoligon: 1, roaPoligon: 2, lotCount: 49413, rmHektar: 7910, hskHektar: 11600, roaHektar: 280 },
    { id: 'rembau', nama: 'Rembau', rmPoligon: 42, pmbPoligon: 14, ganPoligon: 0, roaPoligon: 3, lotCount: 39490, rmHektar: 6480, hskHektar: 8200, roaHektar: 410 },
    { id: 'jelebu', nama: 'Jelebu', rmPoligon: 21, pmbPoligon: 3, ganPoligon: 2, roaPoligon: 17, lotCount: 32225, rmHektar: 5120, hskHektar: 34500, roaHektar: 920 }
  ]
};
