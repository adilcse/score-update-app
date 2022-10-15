const MAX_CHANGE = 3000;
const changedValue = (max = MAX_CHANGE) =>  Math.floor(Math.random() * (max + 1));
const changeOperator = () => Math.random() > 0.5 ? 1 : -1;
const shouldScoreUpdate = () => Math.random() > 0.7;
const randomScore = (score) => {
    if (!shouldScoreUpdate()) {
        return score;
       }
   const newScore = score + changeOperator() * changedValue();
   if (newScore < 0) {
    return score;
   }
   return newScore;
}

export const getUpdatedUsers = (users) =>  users.map(user => ({
        ...user,
        score: randomScore(user.score)
    })
);

export const randomColor = () => Math.floor(Math.random()*16777215).toString(16);

