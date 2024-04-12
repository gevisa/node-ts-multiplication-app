import exp from 'constants';
import { CreateTable } from './create-table.use-case';
import { Options } from './save-file.use-case';


describe('CreateTableUseCase', () => {
    test('should create a multiplication table', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({base: 2});
        const rows = table.split('\n').length;

        expect(createTable).toBeInstanceOf(CreateTable);
        expect( table ).toContain('2 x 1 = 2');
        expect( table ).toContain('2 x 10 = 20');

        expect(rows).toBe(10);

    });

    test('should create table whith custom values', () => {
        const options = {
            base:3,
            limit:20
        };
        const table = new CreateTable().execute(options);
        const rows = table.split('\n').length;
        expect ( table ).toContain('3 x 1 = 3');
        expect ( table ).toContain('3 x 20 = 60');
        expect ( rows ).toBe(options.limit);

        
        
    })
})