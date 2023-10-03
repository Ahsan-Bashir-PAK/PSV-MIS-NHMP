const officeData={
    regions: {
      North: {
        Zones: {
          MC_1: {
            sectors: {
              Lsm: {
                beats: ['Beat1', 'Beat2', 'Beat-LEBP'],
              },
              M2: {
                beats: ['Beat11', 'Beat12', 'Beat-10'],
              },
              M3: {
                beats: ['Beat13', 'Beat14', 'Beat-15'],
              },
            },
          },
          MC_2: {
            sectors: {
              Lsabm: {
                beats: ['Beat110', 'Beat102', 'Beat-123'],
              },
              M21: {
                beats: ['Beat112', 'Beat122', 'Beat-102'],
              },
              M31: {
                beats: ['Beat132', 'Beat142', 'Beat-152'],
              },
            }
          },
          MC_3: {},
        },
      },
      Central: {},
    },
  };

  

  
  const region = Object.keys(data.regions).map(val => {
    return {label: val, value: val};
  });

  const zones =Object.keys(data.regions.North.Zones).map(val => {
    return {label: val, value: val};
  });

   const sectors =Object.keys(data.regions.North.Zones.MC_1.sectors).map(val => {
    return {label: val, value: val};
  });

  const beats =Object.keys(data.regions.North.Zones.MC_1.sectors.Lsm.beats).map(val => {
    return {label: val, value: val};
  });

