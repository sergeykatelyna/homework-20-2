const GUESS_COUNT = 5;

function lottery(number) {
  let cycleCount = 0;
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      cycleCount++;

      const randomNum = Math.floor(Math.random() * 9 + 1);

      console.log(number, randomNum);

      if (randomNum === number) {
        clearInterval(interval);
        resolve();
        return;
      }

      if (cycleCount === GUESS_COUNT) {
        clearInterval(interval);
        reject();
      }
    }, 1000);
  });
}

lottery(5)
  .then(() => console.log('You guessed!'))
  .catch(() => console.log("Sorry, you didn't guess"))
  .then(() => console.log('<-- New Try -->'))
  .then(() => lottery(9))
  .then(() => console.log('You guessed!'))
  .catch(() => console.log("Sorry, you didn't guess"));
