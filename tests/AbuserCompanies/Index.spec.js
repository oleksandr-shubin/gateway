import Index from '../../src/views/AbuserCompanies/Index';
import { shallowMount } from '@vue/test-utils';
import moxios from 'moxios';
import * as HttpStatus from 'http-status-codes';
import WrapperHelper from '../WrapperHelper';
import EmptyRow from '../../src/components/EmptyRow';
import expect from "expect";

describe('Index', () => {
    let indexEndpoint = process.env.VUE_APP_CORE_ENDPOINT + '/api/abusers/companies';
    let wrapper;
    let wrapperHelper;
    let companyData;

    beforeEach(() => {
        moxios.install();

        wrapper = shallowMount(Index, {
            stubs: {
                'empty-row': EmptyRow,
                'router-link': true,
            }
        });

        wrapperHelper = new WrapperHelper(wrapper);

        companyData = {
            id: 1,
            name: 'Company',
            quota: 1212121222221,
            total_amount: 1215555555555,
        };

    });

    afterEach(() => {
        moxios.uninstall();
    });

    it ('renders abuser company table when month is chosen and show report is clicked', (done) => {
        wrapperHelper.see('No data available');

        wrapperHelper.select(0, '#month');

        let month = wrapper.find('#month').element.value;

        moxios.stubRequest(indexEndpoint + `?month=${month}`,{
            status: HttpStatus.OK,
            response: [
                companyData,
            ],
        });

        wrapperHelper.submit('#index-abuser-companies-form');

        moxios.wait(() => {
            expectCompanyIsRendered();
            expect(wrapper.vm.currentMonth).toBe(parseInt(month));

            done();
        });
    });


    let expectCompanyIsRendered = () => {
        wrapperHelper.see(companyData.name, 'td:nth-child(1)');
        wrapperHelper.see(wrapper.vm.humaniseBytes(companyData.quota), 'td:nth-child(2)');
        wrapperHelper.see(wrapper.vm.humaniseBytes(companyData.total_amount), 'td:nth-child(3)');
    }
});
