import { guid } from '../../base/Utils';
import Tabs from "../../base/components/Tabs";
import Button from '../../base/components/Button';
import ViewWindow from '../../base/components/ViewWindow';
import StudentForm from './StudentForm';

export default class ViewImageWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var url = options.url;

    var imageView = {
      render: function(container){
        var image = $('<img src="' + url + '" style="height: 520px; width: 100%;"/>');
        image.appendTo(container);
      }
    };

    this.window = new ViewWindow({
      width: 550,
      height: 700,
      title: 'Image',
      content: imageView,
      onCancel: function(){
        _this.window.close();
      }
    });

  }

  render(container) {

    var _this = this;
    this.window.render(container);

  }

  open(){
    this.window.open();
  }
}
