import Edit from '../../src/views/Company/Edit';
import { shallowMount } from '@vue/test-utils';
import moxios from 'moxios';
import * as HttpStatus from 'http-status-codes';
import WrapperHelper from '../WrapperHelper';
import sinon from 'sinon';
import expect from 'expect';

describe('Edit', () => {
    let companyId = 1;
    let updateEndpoint = process.env.VUE_APP_CORE_ENDPOINT + `/api/companies/${companyId}`;
    let wrapper;
    let wrapperHelper;

    beforeEach(() => {
        moxios.install();

        wrapper = shallowMount(Edit, {
            mocks: {
                $route: {
                    params: {
                        id: companyId,
                    },
                },
            },
            methods: {
                show: () => {},
            },
        });

        wrapper.setData({company: {id: companyId}});

        wrapperHelper = new WrapperHelper(wrapper);

        wrapper.vm.notifySuccess = sinon.spy();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('notifies success when company is updated', (done) => {
        moxios.stubRequest(updateEndpoint, {
            status: HttpStatus.OK,
        });

        wrapperHelper.type("Company", "#name");
        wrapperHelper.type(1212121211, "#quota");
        wrapperHelper.submit("#company-edit-form");

        moxios.wait(() => {
            expect(wrapper.vm.notifySuccess.calledOnce).toBe(true);
            done();
        });
    });

    it('shows error when company update data is invalid', (done) => {
        let nameError = 'Invalid name';
        let quotaError = 'Invalid quota';

        moxios.stubRequest(updateEndpoint,{
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

        wrapperHelper.submit("#company-edit-form");

        moxios.wait(() => {
            wrapperHelper.see(nameError);
            wrapperHelper.see(quotaError);
            expect(wrapper.vm.notifySuccess.called).toBe(false);
            done();
        });
    });
});
