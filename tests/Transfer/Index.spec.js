import Index from '../../src/views/Transfer/Index';
import {shallowMount} from '@vue/test-utils';
import moxios from 'moxios';
import * as HttpStatus from 'http-status-codes';
import WrapperHelper from '../WrapperHelper';
import expect from "expect";
import sinon from "sinon";

describe ('Create', () => {
    let updateEndpoint = process.env.VUE_APP_CORE_ENDPOINT + '/api/transfer-data';
    let wrapper;
    let wrapperHelper;

    beforeEach(() => {
        moxios.install();

        wrapper = shallowMount(Index);

        wrapperHelper = new WrapperHelper(wrapper);

        wrapper.vm.notifySuccess = sinon.spy();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('notifies success and updates button status while generating data', (done) => {
        moxios.stubRequest(updateEndpoint,{
            status: HttpStatus.OK,
        });

        wrapperHelper.see('Generate data');

        wrapperHelper.click('#generate-data-button');

        wrapperHelper.see('Generating data');

        moxios.wait(() => {
            wrapperHelper.see('Generate data');
            expect(wrapper.vm.notifySuccess.calledOnce).toBe(true);

            done();
        });
    });
});
