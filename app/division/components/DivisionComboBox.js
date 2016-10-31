import { guid } from '../../base/Utils';
import ComboBox from "../../base/components/ComboBox";

export default class DivisionComboBox {

  constructor() {
    this.id = guid();

    var comboBoxOptions = {
      displayMember: "nama",
      valueMember: "id",
      placeHolder: 'Pilih Bagian',
      width: 200,
      height: 25,
      theme: 'metro'
    };

    this.comboBox = new ComboBox({
      url: '/divisions_all',
      comboBoxOptions: comboBoxOptions,
      clearSelectionEnabled: true,
      onChange: function(value){
        //
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
