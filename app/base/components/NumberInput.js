import {
  guid
} from '../Utils';

export default class NumberInput {

  constructor(options) {
    this.id = guid();

    if(options.width){
      this.width = options.width;
    }

    if(options.height){
      this.height = options.height;
    }

    this.basicProperties = options.basicProperties

    this.initialValue = options.value;
  }

  render(container) {

    var _this = this;

    var numberInputContainer = $('<div></div>');
    numberInputContainer.appendTo(container);
    numberInputContainer.attr('id', this.id);

    var numberInputOptions =
    {
      theme: 'metro',
    };

    if(this.width){
      numberInputOptions['width'] = this.width;
    }

    if(this.height){
      numberInputOptions['height'] = this.height;
    }

    for(var k in _this.basicProperties) numberInputOptions[k] = _this.basicProperties[k];

    numberInputContainer.jqxNumberInput(numberInputOptions);

    if(this.initialValue){
      numberInputContainer.val(this.initialValue);
    }

    this.numberInputContainer = numberInputContainer;
  }

  getId(){
    return this.id;
  }

  getValue(){
    return this.numberInputContainer.val();
  }

  setValue(value){
    return this.numberInputContainer.val(value);
  }
}
