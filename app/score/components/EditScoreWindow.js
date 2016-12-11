import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import Window from '../../base/components/Window';
import DateRange from '../../base/components/DateRange';
import Label from '../../base/components/Label';
import NumberInput from '../../base/components/NumberInput';
import HospitalComboBox from '../../hospital/components/HospitalComboBox';
import ClinicComboBox from '../../hospital/components/ClinicComboBox';
import RecommendationComboBox from '../../score/components/RecommendationComboBox';

export default class EditScoreWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var score = options.data;
    this.onSaveSuccess = options.onSaveSuccess;

    var nameStr = score.nama + ' [ ' + score.stambuk_lama + ' - ' + score.stambuk_baru + ' ]';
    var startDateStr = $.format.date(score.start_date, "dd-MM-yyyy");
    var endDateStr = $.format.date(score.end_date, "dd-MM-yyyy");

    var nameLabel = new Label({
      text: nameStr,
      bold: true
    });

    var divisionLabel = new Label({
      text: score.nama_bagian,
      bold: true
    });

    var kkLabel = new Label({
      text: startDateStr + ' / ' + endDateStr,
      bold: true
    });

    var hospitalComboBox = new HospitalComboBox({value: score.rumah_sakit_id});
    var clinicComboBox = new ClinicComboBox({value: score.puskesmas_id});
    var recommendationComboBox = new RecommendationComboBox({value: score.rekomendasi_id});
    var preTestNumberInput = new NumberInput({value: score.pre_test, width: '100%', height: 25});
    var tugasIlmiahNumberInput = new NumberInput({value: score.tugas_ilmiah, width: '100%', height: 25});
    var diskusiMingguanNumberInput = new NumberInput({value: score.diskusi_mingguan, width: '100%', height: 25});
    var ujianNumberInput = new NumberInput({value: score.ujian, width: '100%', height: 25});
    var postTestNumberInput = new NumberInput({value: score.post_test, width: '100%', height: 25});
    var nilaiAkhirNumberInput = new NumberInput({value: score.nilai_akhir, width: '100%', height: 25});
    var seminarNumberInput = new NumberInput({value: score.seminar, width: '100%', height: 25});
    var portofolioNumberInput = new NumberInput({value: score.portofolio, width: '100%', height: 25});

    var formItems = [
      {
        name: 'studentName',
        label: 'Nama',
        content: nameLabel
      },
      {
        name: 'divisionName',
        label: 'Bagian',
        content: divisionLabel
      },
      {
        name: 'kk',
        label: 'Masa KK',
        content: kkLabel
      },
      {
        name: 'rs_id',
        label: 'Rumah Sakit',
        content: hospitalComboBox
      },
      {
        name: 'puskesmas_id',
        label: 'Puskesmas',
        content: clinicComboBox
      },
      {
        name: 'rekomendasi_id',
        label: 'Rekomendasi',
        content: recommendationComboBox
      },
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

    var form = new Form(formOptions);

    this.window = new Window({
      width: 420,
      height: 550,
      title: 'Edit Nilai',
      content: form,
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
