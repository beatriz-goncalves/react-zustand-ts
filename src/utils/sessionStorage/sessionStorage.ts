export const loadData = () => {
  const storedData = sessionStorage.getItem("data");
  return storedData ? JSON.parse(storedData) : [];
};

export const saveData = (state: any) => {
  sessionStorage.setItem("data", JSON.stringify(state));
};
