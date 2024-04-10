import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    destination: string;
    fileName: string;

}
export class ServerApp {
   static run({ base, limit, showTable, destination, fileName}: RunOptions) {
        console.log('Server runing...');
      
        const table = new CreateTable().execute({ base, limit });
        const wasCreated = new SaveFile()
        .execute({ 
            fileContent: table, 
            destination: destination,
            fileName: fileName });
       
        ( wasCreated )
         ? console.log('File created successfully') 
         : console.log('File not created');    
        
    }
}