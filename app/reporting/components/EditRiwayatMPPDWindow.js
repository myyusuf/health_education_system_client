import { guid } from '../../base/Utils';
import Tabs from "../../base/components/Tabs";
import Button from '../../base/components/Button';
import AddWindow from '../../base/components/AddWindow';
import StudentForm from './StudentForm';
export default class EditRiwayatMPPDWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var riwayatMppd = options.data;
    this.onSaveSuccess = options.onSaveSuccess;

    var studentForm = new StudentForm({riwayatMppd: riwayatMppd});

    this.window = new AddWindow({
      width: 550,
      height: 700,
      title: 'Riwayat MPPD',
      content: studentForm,
      onSave: function(){
        form.validate();
      },
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
