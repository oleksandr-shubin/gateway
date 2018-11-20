import Create from '../../src/views/Company/Create';
import { shallowMount } from '@vue/test-utils';
import moxios from 'moxios';
import * as HttpStatus from 'http-status-codes';
import WrapperHelper from '../WrapperHelper';
import sinon from 'sinon';
import expect from 'expect';

describe('Create', () => {
    let storeEndpoint = process.env.VUE_APP_CORE_ENDPOINT + '/api/companies';
    let wrapper;
    let wrapperHelper;

    beforeEach(() => {
        moxios.install();

        wrapper = shallowMount(Create);

        wrapperHelper = new WrapperHelper(wrapper);

        wrapper.vm.notifySuccess = sinon.spy();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('notifies success when company is created', (done) => {
        moxios.stubRequest(storeEndpoint, {
            status: HttpStatus.CREATED,
        });

        wrapperHelper.type("Company", "#name");
        wrapperHelper.type(1212121211, "#quota");
        wrapperHelper.submit("#company-create-form");

        moxios.wait(() => {
            expect(wrapper.vm.notifySuccess.calledOnce).toBe(true);
            done();
        });
    });

    it ('shows error when company create data is invalid', (done) => {
        let nameError = 'Invalid name';
        let quotaError = 'Invalid quota';

        moxios.stubRequest(storeEndpoint, {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            response: {
                errors: {
                    name: [
                        nameError,
                    ],

                    quota: [
                        quotaError,
                    ],
                },
            }
        });

        wrapperHelper.submit("#company-create-form");

        moxios.wait(() => {
            wrapperHelper.see(nameError);
            wrapperHelper.see(quotaError);
            expect(wrapper.vm.notifySuccess.called).toBe(false);
            done();
        });
    });
});
