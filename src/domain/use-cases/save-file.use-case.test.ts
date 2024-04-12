import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {

    afterEach(() => {
        //clean up files
        fs.rmSync('test', { recursive: true, force: true });
    })

    test('should save a file whith default values', () => {

        const saveFile = new SaveFile();
        const options = {
            fileContent: 'test content',
            destination: 'test',
        }

        const result = saveFile.execute(options);
        const filePath = `${options.destination}/table.txt`;

        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);

    });

    test('should return false if directory not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('Directory not be created');
        });

        const result = saveFile.execute({
            fileContent: 'test content',
            destination: 'test',
        });
        expect(result).toBeFalsy();

        mkdirSyncSpy.mockRestore();
    });
    test('should return false if file not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('File not be created');
        });
        const result = saveFile.execute({
            fileContent: 'Hola Mundo',
            destination: 'test',
           
        });
        expect(result).toBeFalsy();
        writeFileSyncSpy.mockRestore();
    })

})

