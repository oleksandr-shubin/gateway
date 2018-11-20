import Create from '../../src/views/User/Create';
import { shallowMount } from '@vue/test-utils';
import moxios from 'moxios';
import * as HttpStatus from 'http-status-codes';
import WrapperHelper from '../WrapperHelper';
import sinon from 'sinon';
import expect from 'expect';

describe('Create', () => {
    let storeEndpoint = process.env.VUE_APP_CORE_ENDPOINT + '/api/customers';
    let companyId = 1;
    let wrapper;
    let wrapperHelper;

    beforeEach(() => {
        moxios.install();

        wrapper = shallowMount(Create);

        wrapperHelper = new WrapperHelper(wrapper);

        wrapper.vm.notifySuccess = sinon.spy();

        wrapper.setData({companyList: [{id: companyId}]});
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('notifies success when user is created', (done) => {
        moxios.stubRequest(storeEndpoint, {
            status: HttpStatus.CREATED,
        });

        wrapperHelper.type("John", "#given_name");
        wrapperHelper.type("Smith", "#family_name");
        wrapperHelper.type("john.smith@gmail.com", "#email");
        wrapperHelper.select(0, '#company_id');
        wrapperHelper.submit("#user-create-form");

        moxios.wait(() => {
            expect(wrapper.vm.notifySuccess.calledOnce).toBe(true);
            done();
        });
    });

    it('shows error when user create data is invalid', (done) => {
        let givenNameError = 'Invalid given name';
        let familyNameError = 'Invalid family name';
        let emailError = 'Invalid email';
        let companyError = 'Invalid company';

        moxios.stubRequest(storeEndpoint, {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            response: {
                errors: {
                    given_name: [
                        givenNameError,
                    ],
                    family_name: [
                        familyNameError,
                    ],
                    email: [
                        emailError,
                    ],
                    company_id: [
                        companyError,
                    ],
                },
            }
        });

        wrapperHelper.submit("#user-create-form");

        moxios.wait(() => {
            wrapperHelper.see(givenNameError);
            wrapperHelper.see(familyNameError);
            wrapperHelper.see(emailError);
            wrapperHelper.see(companyError);
            expect(wrapper.vm.notifySuccess.called).toBe(false);
            done();
        });
    });
});
