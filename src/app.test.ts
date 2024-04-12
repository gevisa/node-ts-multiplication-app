import { ServerApp } from "./presentation/server-app";

describe('Test App.ts', () => {

    test('should call Server with values', async () => {
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = [...process.argv, '-b', '5', '-l', '10', '-s', '-d', 'test-destination', '-n', 'test-file-name'];

        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 5,
            limit: 10,
            showTable: true,
            destination: 'test-destination',
            fileName: 'test-file-name'
        });

    });
});