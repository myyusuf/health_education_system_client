import { guid } from '../../base/Utils';
import Tabs from "../../base/components/Tabs";
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import AddWindow from '../../base/components/AddWindow';
import TextBox from '../../base/components/TextBox';
import NumberInput from '../../base/components/NumberInput';
import CheckBox from '../../base/components/CheckBox';
import Label from '../../base/components/Label';

export default class EditRiwayatMPPDWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var student = options.data;
    this.onSaveSuccess = options.onSaveSuccess;

    var checkBox1 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat baca referat karena alasan pembimbing'});
    var checkBox2 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat baca referat karena alasan MPPD'});
    var checkBox3 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat ujian karena alasan penguji'});
    var checkBox4 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat ujian karena alasan MPPD'});
    var checkBox5 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat menyelesaikan portofolio'});
    var checkBox6 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat dapat TTD bakordik'});
    var checkBox7 = new CheckBox({height: 25, width: '100%',
    label: 'Tidak lulus ujian supervisor'});
    var checkBox8 = new CheckBox({height: 25, width: '100%',
    label: 'Adaptasi'});
    var checkBox9 = new CheckBox({height: 25, width: '100%',
    label: 'Tidak lulus post test'});
    var checkBox10 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat keluar siklus karena jumlah kehadiran seminar <80%'});

    var postTestCountNumberInput = new NumberInput({
      value: 0, width: '50%', height: 25,
      basicProperties: {
        min: 0,
        max: 99,
        decimalDigits: 0,
        digits: 2,
        spinButtons: true
      }
  });

    var formItems = [
      {
        name: 'checkBox1',
        label: '',
        content: checkBox1
      },
      {
        name: 'checkBox2',
        label: '',
        content: checkBox2
      },
      {
        name: 'checkBox3',
        label: '',
        content: checkBox3
      },
      {
        name: 'checkBox4',
        label: '',
        content: checkBox4
      },
      {
        name: 'checkBox5',
        label: '',
        content: checkBox5
      },
      {
        name: 'checkBox6',
        label: '',
        content: checkBox6
      },
      {
        name: 'checkBox7',
        label: '',
        content: checkBox7
      },
      {
        name: 'checkBox8',
        label: '',
        content: checkBox8
      },
      {
        name: 'checkBox9',
        label: '',
        content: checkBox9
      },
      {
        name: 'postTestCount',
        label: '',
        content: postTestCountNumberInput
      },
      {
        name: 'checkBox10',
        label: '',
        content: checkBox10
      },
    ];
    var formOptions = {
      items: formItems,
      labelColumnWidth: '40px',
      onValidationSuccess: function(formValue){
        $.ajax({
              method: "POST",
              url: "/students",
              data: formValue
            }).done(function() {
                $("#successNotification").jqxNotification("open");
                _this.window.close();
                if(_this.onSaveSuccess){
                  _this.onSaveSuccess();
                }
            }).fail(function( jqXHR, textStatus, errorThrown) {
                var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
                $("#errorNotification").html('<div>' + errorMessage + '</div>');
                $("#errorNotification").jqxNotification("open");
            });
      }
    }

    var form = new Form(formOptions);

    var tabs = new Tabs([
      {
        id: 'summary',
        title: 'Summary',
        content: form
      }
    ],
  {
    width: 530,
    height: 500
  });

    this.window = new AddWindow({
      width: 550,
      height: 600,
      title: 'Edit Riwayat MPPD',
      content: tabs,
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
