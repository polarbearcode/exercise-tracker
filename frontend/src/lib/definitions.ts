export type Exercise = {
  name: string;
  count: number;
  dateAdded: string;
};

export type Category = {
  name: string;
  exercises: Exercise[];
};
