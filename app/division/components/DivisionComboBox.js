import { guid } from '../../base/Utils';
import ComboBox from "../../base/components/ComboBox";

export default class DivisionComboBox {

  constructor(options) {
    this.id = guid();

    var comboBoxOptions = {
      displayMember: "nama",
      valueMember: "id",
      placeHolder: 'Pilih Bagian',
      width: 220,
      height: 25,
      theme: 'metro'
    };

    this.comboBox = new ComboBox({
      url: '/divisions_all',
      comboBoxOptions: comboBoxOptions,
      clearSelectionEnabled: true,
      value: options.value,
      onChange: function(value){
        if(options.onChange){
          options.onChange(value);
        }
      }
    });

  }

  getId(){
    return this.comboBox.getId();
  }

  render(container){
    this.comboBox.render(container);
  }

  getValue(){
    return this.comboBox.getValue();
  }

}
