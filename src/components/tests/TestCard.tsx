function handleClick() {
  if (action.kind === "done") return;
  if (!test.durationSec) {
    alert("У теста не указана длительность");
    return;
  }

  navigate(`/student/test/${test.id}`, {
    state: { durationSec: test.durationSec },
  });
}
