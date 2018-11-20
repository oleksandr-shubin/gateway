import Index from '../../src/views/User/Index';
import { shallowMount } from '@vue/test-utils';
import moxios from 'moxios';
import * as HttpStatus from 'http-status-codes';
import WrapperHelper from '../WrapperHelper';
import EmptyRow from '../../src/components/EmptyRow';

describe('Index', () => {
    let indexEndpoint = process.env.VUE_APP_CORE_ENDPOINT + '/api/customers?page=1';
    let destroyEndpoint = process.env.VUE_APP_CORE_ENDPOINT + '/api/customers/1';
    let wrapper;
    let wrapperHelper;
    let userData;

    beforeEach(() => {
        moxios.install();

        wrapper = shallowMount(Index, {
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
            email: 'john.smith@gmail.com',
            company_name: 'Company',
        };

    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('renders user table when created', (done) => {
        moxios.stubRequest(indexEndpoint,{
            status: HttpStatus.OK,
            response: {
                data: [
                    userData,
                ]
            },
        });

        wrapperHelper.see('No data available');

        moxios.wait(() => {
            expectUserIsRendered();
            done();
        });
    });

    it('re renders table when user is deleted', (done) => {
        wrapper.setData({
            paginator: {
                data: [
                    userData,
                ],
            },
        });

        expectUserIsRendered();


        moxios.stubRequest(destroyEndpoint,{
            status: HttpStatus.NO_CONTENT,
            response: [],
        });

        moxios.stubRequest(indexEndpoint, {
            status: HttpStatus.OK,
            response: { paginator: { data: [] } },
        });


        moxios.wait(() => {
            wrapperHelper.see('No data available');
            done();
        });
    });

    let expectUserIsRendered = () => {
        wrapperHelper.see(userData.given_name, 'td:nth-child(1)');
        wrapperHelper.see(userData.family_name, 'td:nth-child(2)');
        wrapperHelper.see(userData.email, 'td:nth-child(3)');
        wrapperHelper.see(userData.company_name, 'td:nth-child(4)');
    }
});
