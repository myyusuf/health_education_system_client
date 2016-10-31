import { guid } from '../../base/Utils';
import ComboBox from "../../base/components/ComboBox";

export default class StudentComboBox {

  constructor(options) {
    this.id = guid();

    var studentLevel = options.studentLevel;

    var comboBoxOptions = {
      displayMember: "nama",
      valueMember: "id",
      placeHolder: 'Pilih Siswa',
      width: '100%',
      height: 25,
      theme: 'metro'
    };

    var url = '/students_all';
    if(studentLevel){
      url = '/students_all?level=' + studentLevel;
    }

    this.comboBox = new ComboBox({
      url: url,
      value: options.value,
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
