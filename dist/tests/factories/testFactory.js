import { faker } from '@faker-js/faker';
function createTest() {
    return {
        name: faker.internet.domainWord(),
        pdfUrl: faker.internet.url(),
        category: 'Projeto',
        discipline: 'JavaScript',
        teacher: 'Diego Pinho'
    };
}
var testFactory = {
    createTest: createTest
};
export default testFactory;
