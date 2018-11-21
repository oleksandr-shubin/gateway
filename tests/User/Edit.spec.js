import Edit from '../../src/views/User/Edit';
import { shallowMount } from '@vue/test-utils';
import moxios from 'moxios';
import * as HttpStatus from 'http-status-codes';
import WrapperHelper from '../WrapperHelper';
import sinon from 'sinon';
import expect from 'expect';

describe ('Edit', () => {
    let userId = 1;
    let updateEndpoint = process.env.VUE_APP_CORE_ENDPOINT + `/api/customers/${userId}`;
    let wrapper;
    let wrapperHelper;

    beforeEach(() => {
        moxios.install();

        wrapper = shallowMount(Edit, {
            mocks: {
                $route: {
                    params: {
                        id: userId,
                    },
                },
            },
            methods: {
                show: () => {},
            },
        });

        wrapperHelper = new WrapperHelper(wrapper);

        wrapper.vm.notifySuccess = sinon.spy();

        wrapper.setData({ user: {id: userId} });
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('notifies success when user is updated', (done) => {
        moxios.stubRequest(updateEndpoint, {
            status: HttpStatus.CREATED,
        });

        wrapperHelper.type("John", "#given_name");
        wrapperHelper.type("Smith", "#family_name");
        wrapperHelper.type("john.smith@gmail.com", "#email");
        wrapperHelper.submit("#user-edit-form");

        moxios.wait(() => {
            expect(wrapper.vm.notifySuccess.calledOnce).toBe(true);
            done();
        });
    });

    it('shows error when user update data is invalid', (done) => {
        let givenNameError = 'Invalid given name';
        let familyNameError = 'Invalid family name';
        let emailError = 'Invalid email';

        moxios.stubRequest(updateEndpoint, {
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
                },
            }
        });

        wrapperHelper.submit("#user-edit-form");

        moxios.wait(() => {
            wrapperHelper.see(givenNameError);
            wrapperHelper.see(familyNameError);
            wrapperHelper.see(emailError);
            expect(wrapper.vm.notifySuccess.called).toBe(false);
            done();
        });
    });
});
