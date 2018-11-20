import Index from '../../src/views/Company/Index';
import { shallowMount } from '@vue/test-utils';
import moxios from 'moxios';
import * as HttpStatus from 'http-status-codes';
import WrapperHelper from '../WrapperHelper';
import EmptyRow from '../../src/components/EmptyRow';

describe('Index', () => {
    let indexEndpoint = process.env.VUE_APP_CORE_ENDPOINT + '/api/companies?page=1';
    let destroyEndpoint = process.env.VUE_APP_CORE_ENDPOINT + '/api/companies/1';
    let wrapper;
    let wrapperHelper;
    let companyData;

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

        companyData = {
            id: 1,
            name: 'Company',
            quota: 1212121222221,
        };

    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('renders company table when created', (done) => {
        moxios.stubRequest(indexEndpoint,{
            status: HttpStatus.OK,
            response: {
                data: [
                    companyData,
                ]
            },
        });

        wrapperHelper.see('No data available');

        moxios.wait(() => {
            expectCompanyIsRendered();
            done();
        });
    });

    it('re renders table when company is deleted', (done) => {
        wrapper.setData({
            paginator: {
                data: [
                    companyData,
                ],
            },
        });

        expectCompanyIsRendered();


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

    let expectCompanyIsRendered = () => {
        wrapperHelper.see(companyData.name, 'td:nth-child(1)');
        wrapperHelper.see(wrapper.vm.humaniseBytes(companyData.quota), 'td:nth-child(2)');
    }
});
