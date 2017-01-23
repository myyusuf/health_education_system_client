import {
  guid
} from '../Utils';

export default class CheckBox {

  constructor(options) {
    this.id = guid();

    if(options.label){
      this.label = options.label;
    }else{
      this.label = '';
    }

    if(options.width){
      this.width = options.width;
    }

    if(options.height){
      this.height = options.height;
    }

    this.placeHolder = options.placeHolder;

    this.initialValue = options.value;
  }

  render(container) {
    var checkBoxContainer = $('<div>' + this.label + '</div>');
    checkBoxContainer.attr('id', this.id);
    checkBoxContainer.appendTo(container);

    var checkBoxOptions = {
      theme: 'metro'
    };

    if(this.width){
      checkBoxOptions['width'] = this.width;
    }

    if(this.height){
      checkBoxOptions['height'] = this.height;
    }

    if(this.placeHolder){
      checkBoxOptions['placeHolder'] = this.placeHolder;
    }

    checkBoxContainer.jqxCheckBox(checkBoxOptions);

    if(this.initialValue){
      checkBoxContainer.val(this.initialValue);
    }

    this.component = checkBoxContainer;
  }

  getId(){
    return this.id;
  }

  getValue(){
    return this.component.val();
  }
}
