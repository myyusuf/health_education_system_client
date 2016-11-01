import { guid } from '../../base/Utils';
import ComboBox from "../../base/components/ComboBox";

export default class ClinicComboBox {

  constructor(options) {
    this.id = guid();

    var comboBoxOptions = {
      displayMember: "nama",
      valueMember: "id",
      placeHolder: 'Pilih Puskesmas',
      width: '100%',
      height: 25,
      theme: 'metro',
      // selectionMode: 'dropDownList'
    };

    this.comboBox = new ComboBox({
      url: '/hospitals/clinics_all',
      value: options.value,
      clearSelectionEnabled: true,
      comboBoxOptions: comboBoxOptions,
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
