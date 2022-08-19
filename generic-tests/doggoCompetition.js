function doggoCompetition(dogPosition) {
  const positions = [];

  for (let i = 1; i <= 100; i += 1) {
    let thisPos = '';
    thisPos += i;
    if (Math.floor(i / 10) === 1) {
      thisPos += 'th';
    } else {
      switch (i % 10) {
        case 1: thisPos += 'st';
          break;
        case 2: thisPos += 'nd';
          break;
        case 3: thisPos += 'rd';
          break;
        default:
          thisPos += 'th';
      }
    }
    if (i !== dogPosition) {
      positions.push(thisPos);
    }
  }
  return positions;
}

module.exports.doggoCompetition = doggoCompetition;
