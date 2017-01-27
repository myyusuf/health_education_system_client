import {
  guid
} from '../Utils';

export default class DateInput {

  constructor(options) {
    this.id = guid();

    if(options.width){
      this.width = options.width;
    }

    if(options.height){
      this.height = options.height;
    }

    this.initialValue = options.value;
  }

  render(container) {

    var _this = this;

    var dateInputContainer = $('<div></div>');
    dateInputContainer.appendTo(container);
    dateInputContainer.attr('id', this.id);

    var dateInputOptions =
    {
      theme: 'metro',
    };

    if(this.width){
      dateInputOptions['width'] = this.width;
    }

    if(this.height){
      dateInputOptions['height'] = this.height;
    }

    dateInputContainer.jqxDateTimeInput(dateInputOptions);

    if(this.initialValue){
        dateInputContainer.jqxDateTimeInput('val', this.initialValue);
    }

    this.dateInputContainer = dateInputContainer;
  }

  getId(){
    return this.id;
  }

  getValue(){
    return this.dateInputContainer.jqxDateTimeInput('getDate');
  }
}
