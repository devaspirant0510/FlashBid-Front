import { http, HttpResponse } from 'msw';
import { fakerKO } from '@faker-js/faker';

const fakerT1 = fakerKO;

export const handlers = [
    http.get('/api/auction-list', () => {
        const fakeData = Array.from({ length: 20 }, () => ({
            id: fakerT1.string.uuid(),
            image: fakerT1.image.url(),
            userName: fakerT1.person.fullName(),
            userProfileUrl:fakerT1.image.avatar(),
            title: `[${fakerT1.company.name()}]`+fakerT1.commerce.productName() + ' 경매',
            description: fakerT1.commerce.productDescription()+fakerT1.lorem.lines(10),
            createdAt: fakerT1.date.anytime(),
        }));

        return HttpResponse.json(fakeData);
    }),
];
