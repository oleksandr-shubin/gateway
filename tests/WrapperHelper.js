import expect from "expect";

class WrapperHelper {
    constructor(wrapper) {
        this.wrapper = wrapper;
    }

    see(text, selector) {
        let wrap = selector ? this.wrapper.find(selector) : this.wrapper;

        expect(wrap.html()).toContain(text);
    };

    click(selector) {
        this.wrapper.find(selector).trigger('click');
    };

    submit(selector) {
        this.wrapper.find(selector).trigger('submit');
    }

    type(text, selector) {
        let node = this.wrapper.find(selector);

        node.element.value = text;
        node.trigger('input');
    };

    select(optionNumber, selector) {
        this.wrapper.findAll('option').at(optionNumber).element.selected = true;
        this.wrapper.find(selector).trigger('change');
    }
}

export default WrapperHelper;
