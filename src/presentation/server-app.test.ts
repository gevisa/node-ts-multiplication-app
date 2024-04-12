import { ServerApp } from './server-app';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { CreateTable } from '../domain/use-cases/create-table.use-case';



describe('ServerApp', () => {
    const options = {
        base: 2,
        limit: 10,
        showTable: true,
        destination: 'test-destination',
        fileName: 'test-file-name'
    };

    test('should run', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');

    });

    test('should run with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const CreateTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');


        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server runing...');
        expect(logSpy).toHaveBeenLastCalledWith('File created successfully');

        expect(CreateTableSpy).toHaveBeenCalledTimes(1);
        expect(CreateTableSpy).toHaveBeenCalledWith({
            base: options.base, limit: options.limit
        });

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            destination: options.destination,
            fileName: options.fileName
        })


    });
    test('should run with custom values mocked', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;


        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server runing...');
        expect(createMock).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            destination: options.destination,
            fileName: options.fileName
        });
        expect(logMock).toHaveBeenCalledWith('File created successfully');
    });
})