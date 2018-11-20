import Index from '../../src/views/AbuserCompanyUsers/Index';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import moxios from 'moxios';
import * as HttpStatus from 'http-status-codes';
import WrapperHelper from '../WrapperHelper';
import EmptyRow from '../../src/components/EmptyRow';
import VueRouter from 'vue-router';
import expect from "expect";

describe('Index', () => {
    let month = 1;
    let companyId = 1;
    let indexEndpoint = process.env.VUE_APP_CORE_ENDPOINT + `/api/abusers/companies/${companyId}/customers?month=${month}`;
    let wrapper;
    let wrapperHelper;
    let userData;
    let data;

    beforeEach(() => {
        moxios.install();

        const localVue = createLocalVue();
        localVue.use(VueRouter);
        const router = new VueRouter({
            routes: [
                {
                    path: '/abusers/companies/:id/month/:month/users',
                    name: 'abuser-company-users',
                },
            ]
        });

        router.push({
            name: 'abuser-company-users', params: {id: companyId, month: month}
        });

        wrapper = shallowMount(Index, {
            localVue,
            router,
            stubs: {
                'empty-row': EmptyRow,
                'pagination': true,
                'router-link': true,
            }
        });

        wrapperHelper = new WrapperHelper(wrapper);

        userData = {
            given_name: 'John',
            family_name: 'Smith',
            total_amount: 11112121121,
        };

        data = {
            data: [
                userData,
            ],
            company: 'Company',
            month: month,
        };

    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('renders abuser company user table when created', (done) => {
        moxios.stubRequest(indexEndpoint, {
            status: HttpStatus.OK,
            response: data,
        });

        wrapperHelper.see('No data available');

        moxios.wait(() => {
            expectUserIsRendered();
            expect(wrapper.vm.companyName).toBe(data.company);
            expect(wrapper.vm.month.value).toBe(data.month);

            done();
        });
    });

    let expectUserIsRendered = () => {
        wrapperHelper.see(userData.given_name, 'td:nth-child(1)');
        wrapperHelper.see(userData.family_name, 'td:nth-child(2)');
        wrapperHelper.see(wrapper.vm.humaniseBytes(userData.total_amount), 'td:nth-child(3)');
    }
});
