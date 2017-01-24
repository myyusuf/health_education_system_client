import { guid } from '../../base/Utils';
import Form from '../../base/components/Form';
import NumberInput from '../../base/components/NumberInput';
import TextBox from '../../base/components/TextBox';
import CheckBox from '../../base/components/CheckBox';
import Label from '../../base/components/Label';

export default class ScoreInfo {

  constructor(options) {
    this.id = guid();

    var score = {};

    var preTestNumberInput = new NumberInput({value: score.pre_test, width: '70%', height: 25});
    var tugasIlmiahNumberInput = new NumberInput({value: score.tugas_ilmiah, width: '70%', height: 25});
    var diskusiMingguanNumberInput = new NumberInput({value: score.diskusi_mingguan, width: '70%', height: 25});
    var ujianNumberInput = new NumberInput({value: score.ujian, width: '70%', height: 25});
    var postTestNumberInput = new NumberInput({value: score.post_test, width: '70%', height: 25});
    var nilaiAkhirNumberInput = new NumberInput({value: score.nilai_akhir, width: '70%', height: 25});
    var seminarNumberInput = new NumberInput({value: score.seminar, width: '70%', height: 25});
    var portofolioNumberInput = new NumberInput({value: score.portofolio, width: '70%', height: 25});
    var judulLaporanKasusTextBox = new TextBox({value: score.judul_laporan_kasus, height: 25, width: '70%'});

    var formItems = [
      {
        name: 'pre_test',
        label: 'Nilai Pre-Test',
        content: preTestNumberInput
      },
      {
        name: 'tugas_ilmiah',
        label: 'Tugas Ilmiah',
        content: tugasIlmiahNumberInput
      },
      {
        name: 'diskusi_mingguan',
        label: 'Tugas Ilmiah',
        content: diskusiMingguanNumberInput
      },
      {
        name: 'ujian',
        label: 'Ujian',
        content: ujianNumberInput
      },
      {
        name: 'post_test',
        label: 'Post Test',
        content: postTestNumberInput
      },
      {
        name: 'nilai_akhir',
        label: 'Nilai Akhir',
        content: nilaiAkhirNumberInput
      },
      {
        name: 'seminar',
        label: 'Seminar',
        content: seminarNumberInput
      },
      {
        name: 'portofolio',
        label: 'Portofolio',
        content: portofolioNumberInput
      },
      {
        name: 'judul_laporan_kasus',
        label: 'Judul Laporan Kasus',
        content: judulLaporanKasusTextBox
      },
    ];
    var formOptions = {
      items: formItems,
      labelColumnWidth: '120px',
      onValidationSuccess: function(formValue){
        $.ajax({
              method: "PUT",
              url: "/scores/" + score.id,
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

    this.form = new Form(formOptions);
  }

  render(container) {

    var innerContainer = $('<div style="padding: 10px; padding-left: 15px;"></div>');
    innerContainer.appendTo(container);
    this.form.render(innerContainer);
  }
}
