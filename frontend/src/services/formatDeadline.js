const formatDeadline = (deadline) => {
  deadline = deadline.split("-");
  deadline[2] = deadline[2].replace("T", ".");
  deadline[2] = deadline[2].split(".");
  deadline[2][1] = deadline[2][1].split(":");
  deadline = deadline.flat(2);
  deadline.pop();

  return deadline;
};

export default formatDeadline;
