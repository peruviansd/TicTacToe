(function () {
  const container = document.querySelector("#container");
  const button = document.querySelector("#restart");

  const combinationToWin = [
    "123",
    "456",
    "789",
    "147",
    "258",
    "369",
    "159",
    "753",
  ];
  let combinationToWinA = [...combinationToWin];
  let combinationToWinB = [...combinationToWin];

  let combinationsA = "";
  let combinationsB = "";
  let turno = "A";

  container.addEventListener("click", handleClick);
  button.addEventListener("click", clean);

  const checkWinner = (combinationToWin, combinationPlayer) => {
    for (const comb of combinationToWin) {
      const regex = new RegExp(`[${comb[0]}|${comb[1]}|${comb[2]}]`, "g");
      const arr = combinationPlayer.match(regex);

      if (arr && arr.length === 3) {
        alert("You've won");
        button.disabled = false;
        button.style.opacity = "1";
        container.removeEventListener("click", handleClick);
        return;
      }
    }
    if (combinationToWinA.length === 0 && combinationToWinB.length === 0) {
      button.disabled = false;
      button.style.opacity = "1";
    }
  };

  function handleClick(e) {
    button.disabled = true;
    button.style.opacity = ".4";
    if (!e.target.textContent && turno == "A") {
      e.target.textContent = "X";
      combinationsA += e.target.id;
      if (combinationsB) {
        combinationToWinA = combinationToWinA.filter(
          (e) => !e.includes(combinationsB.slice(-1))
        );
      }

      if (combinationsA.length > 2) {
        checkWinner(combinationToWinA, combinationsA);
      }
      turno = "B";
    } else if (!e.target.textContent && turno == "B") {
      e.target.textContent = "O";
      combinationsB += e.target.id;
      if (combinationsA) {
        combinationToWinB = combinationToWinB.filter(
          (e) => !e.includes(combinationsA.slice(-1))
        );
      }

      if (combinationsB.length > 2) {
        checkWinner(combinationToWinB, combinationsB);
      }
      turno = "A";
    }
  }

  function clean(e) {
    e.target.disabled = true;

    document.querySelectorAll(".item").forEach((el) => (el.textContent = ""));
    container.addEventListener("click", handleClick);
    combinationToWinA = [...combinationToWin];
    combinationToWinB = [...combinationToWin];
    combinationsA = "";
    combinationsB = "";
  }
})();
