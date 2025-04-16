import { Convention } from "./convention";
import { FileModel } from "./file-model";
import { Journal } from "./journal";
import { Summer } from "./summer";
import { Task } from "./task";

export interface Entities {

    tasks: Task[];
    journal: Journal;
    file:FileModel;
    summerInternship: Summer;
    internshipConvention: Convention;
}
