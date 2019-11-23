import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class OptionalValuesService implements OnDestroy {

  applicationOptionalValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  processOptionalValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  serviceOptionalValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  artifactTypeOptionalValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  artifactNameOptionalValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  exeTypeOptionalValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  exeNameOptionalValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  applicationProcessValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  selectedAppPrcoessValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  selecetedProcessTxnValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  reportTableMenuViewValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  reportTableMenuClickValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  defaultreportTableValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  V_SRC_CD: string;
  V_USR_NM: string;
  application_id: any;
  process_id: any;
  applicationArray = [];
  processArray = [];
  serviceArray = [];
  applicationProcessArray = [];
  artifactTypeArray = [];
  artifactNameArray = [];
  exeTypeArray = [];
  exeNameArray = [];

  private apiUrlGet = this.apiService.endPoints.insecure;
  constructor(private http: HttpClient, private apiService: ApiService) {
  }

  ngOnDestroy() {
    this.applicationOptionalValue.unsubscribe();
    this.processOptionalValue.unsubscribe();
    this.serviceOptionalValue.unsubscribe();
    this.reportTableMenuViewValue.unsubscribe();
    this.reportTableMenuClickValue.unsubscribe();
  }

  getApplicationOptionalValue() {
    this.getExeTypeOptionalValue();
    this.getArtifactTypeOptionalValue();
    this.V_SRC_CD = JSON.parse(sessionStorage.getItem('u')).SRC_CD;
    this.V_USR_NM = JSON.parse(sessionStorage.getItem('u')).USR_NM;
    this.http.get(this.apiUrlGet + "V_SRC_CD=" + this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=SourceApps&Verb=GET").subscribe(
      res => {
        if (res) {
          this.applicationArray = res['APP_CD'];
          this.applicationOptionalValue.next(res['APP_CD']);
        }
      });
  }
  getProcessOptionalValue(application, update?) {
    this.V_SRC_CD = JSON.parse(sessionStorage.getItem('u')).SRC_CD;
    this.V_USR_NM = JSON.parse(sessionStorage.getItem('u')).USR_NM;
    let flag = 0;
    let index = 0;
    if (this.processArray.length) {
      this.processArray.forEach((ele, i) => {
        if (ele.app === application) {
          flag = 1;
          index = i;
        }
      })
    }
    if (!flag || !this.processArray.length) {
      this.http.get(this.apiUrlGet + "V_APP_CD=" + application + "&V_SRC_CD=" + this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=AppProcesses&Verb=GET").subscribe(
        res => {
          if (res) {
            this.processArray.push({ 'app': application, 'process': res['PRCS_CD'], 'data': res });
            this.processOptionalValue.next(this.processArray);
          }
        });
    }
    if (flag && update) {
      this.http.get(this.apiUrlGet + "V_APP_CD=" + application + "&V_SRC_CD=" + this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=AppProcesses&Verb=GET").subscribe(
        res => {
          if (res) {
            this.processArray[index].app = application;
            this.processArray[index].process = res['PRCS_CD'];
            this.processArray[index].data = res;
            this.processOptionalValue.next(this.processArray);
          }
        });
    }
  }
  getServiceOptionalValue(application, process, update?) {
    this.V_SRC_CD = JSON.parse(sessionStorage.getItem('u')).SRC_CD;
    this.V_USR_NM = JSON.parse(sessionStorage.getItem('u')).USR_NM;
    let flag = 0;
    let index = 0;
    if (this.serviceArray.length) {
      this.serviceArray.forEach((ele, i) => {
        if (ele.process === process && ele.app === application) {
          flag = 1;
          index = i;
        }
      })
    }
    if (!flag || !this.serviceArray.length) {
      this.http.get(this.apiUrlGet + "V_APP_CD=" + application + "&V_SRC_CD=" + this.V_SRC_CD + "&V_PRCS_CD=" + process + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=ProcessServices&Verb=GET").subscribe(
        res => {
          if (res) {
            this.serviceArray.push({ 'app': application, 'process': process, 'service': res['SRVC_CD'], 'data': res });
            this.serviceOptionalValue.next(this.serviceArray);
          }
        });
    }
    if (flag && update) {
      this.http.get(this.apiUrlGet + "V_APP_CD=" + application + "&V_SRC_CD=" + this.V_SRC_CD + "&V_PRCS_CD=" + process + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=ProcessServices&Verb=GET").subscribe(
        res => {
          if (res) {
            this.serviceArray[index].app = application;
            this.serviceArray[index].process = process;
            this.serviceArray[index].service = res['SRVC_CD'];
            this.serviceArray[index].data = res;
            this.serviceOptionalValue.next(this.serviceArray);
          }
        });
    }
  }
  getApplicationProcessOptionalValue(data) {
    if (data.length) {
      this.applicationProcessArray = [];
      data.forEach(ele => {
        this.applicationProcessArray.push({ 'app': ele.APP_CD, 'process': ele.PRCS_CD.split(","), 'auth': ele.PRCS_AUTH.split(",") });
      })
      this.applicationProcessValue.next(this.applicationProcessArray);
    }
  }
  getArtifactTypeOptionalValue() {
    this.V_SRC_CD = JSON.parse(sessionStorage.getItem('u')).SRC_CD;
    this.V_USR_NM = JSON.parse(sessionStorage.getItem('u')).USR_NM;
    this.http.get(this.apiUrlGet + "V_SRC_CD=" + this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=ArtifactTypes&Verb=GET").subscribe(
      res => {
        if (res) {
          this.artifactTypeArray = res['ARTFCT_TYP'];
          this.artifactTypeOptionalValue.next(res['ARTFCT_TYP']);
        }
      });
  }
  getArtifactNameOptionalValue(artifactType, update?) {
    this.V_SRC_CD = JSON.parse(sessionStorage.getItem('u')).SRC_CD;
    this.V_USR_NM = JSON.parse(sessionStorage.getItem('u')).USR_NM;
    let flag = 0;
    let index = 0;
    if (this.artifactNameArray.length) {
      this.artifactNameArray.forEach((ele, i) => {
        if (ele.artifactType === artifactType) {
          flag = 1;
          index = i;
        }
      })
    }
    if (!flag || !this.artifactNameArray.length) {
      this.http.get(this.apiUrlGet + "V_ARTFCT_TYP=" + artifactType + "&V_SRC_CD=" + this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=UsersArtifact&Verb=GET").subscribe(
        res => {
          if (res) {
            this.artifactNameArray.push({ 'artifactType': artifactType, 'artifactName': res['ARTFCT_CD'], 'data': res });
            this.artifactNameOptionalValue.next(this.artifactNameArray);
          }
        });
    }
  }
  getExeTypeOptionalValue() {
    this.V_SRC_CD = JSON.parse(sessionStorage.getItem('u')).SRC_CD;
    this.V_USR_NM = JSON.parse(sessionStorage.getItem('u')).USR_NM;
    this.http.get(this.apiUrlGet + "V_SRC_CD=" + this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=ExeTypes&Verb=GET").subscribe(
      res => {
        if (res) {
          this.exeTypeArray = res['EXE_TYP'];
          this.exeTypeOptionalValue.next(res['EXE_TYP']);
        }
      });
  }
  getExeNameOptionalValue(exeType) {
    this.V_SRC_CD = JSON.parse(sessionStorage.getItem('u')).SRC_CD;
    this.V_USR_NM = JSON.parse(sessionStorage.getItem('u')).USR_NM;
    let flag = 0;
    let index = 0;
    if (this.exeNameArray.length) {
      this.exeNameArray.forEach((ele, i) => {
        if (ele.exeType === exeType) {
          flag = 1;
          index = i;
        }
      })
    }
    if (!flag || !this.exeNameArray.length) {
      this.http.get(this.apiUrlGet + "V_EXE_TYP=" + exeType + "&V_SRC_CD=" + this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=UsersExe&Verb=GET").subscribe(
        res => {
          if (res) {
            this.exeNameArray.push({ 'exeType': exeType, 'exeName': res['EXE_CD'], 'data': res });
            this.exeNameOptionalValue.next(this.exeNameArray);
          }
        });
    }
  }
}
export class ProcessObservable {
  app: any;
  process: any;
  data: any;
}
export class ServiceObservable {
  app: any;
  process: any;
  service: any;
  data: any;
}

export class ApplicationProcessObservable {
  app: any;
  process: any;
}