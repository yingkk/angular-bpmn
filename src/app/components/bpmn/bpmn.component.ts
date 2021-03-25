import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import PropertiesPanel from 'bpmn-js-properties-panel';

// import BpmnPropertiesProvider from 'bpmn-js-properties-panel/lib/provider/bpmn';
import CamundaPropertiesProvider from 'bpmn-js-properties-panel/lib/provider/camunda';
import * as CamundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
import customTranslate from './i18n/translate';


@Component({
  selector: 'app-bpmn',
  templateUrl: './bpmn.component.html',
  styleUrls: ['./bpmn.component.scss']
})
export class BpmnComponent implements OnInit {

  private modeler: BpmnModeler;

  private readonly newDiagram = 'assets/bpmn/init.bpmn';

  public saveHref;

  public saveName = '';

  public customTranslateModule = {
    translate: ['value', customTranslate]
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.initModeler();
  }

  initModeler() {
    this.modeler = new BpmnModeler({
      container: '#canvas',
      propertiesPanel: {
        parent: '#properties-panel'
      },
      additionalModules: [
        PropertiesPanel,
        CamundaPropertiesProvider,
        // BpmnPropertiesProvider,
        this.customTranslateModule
      ],
      moddleExtensions: {
        // 如果要在属性面板中维护camunda：XXX属性，
        camunda: CamundaModdleDescriptor
      }
    });
    this.initDiagram();
  }

  initDiagram() {
    this.load(this.newDiagram);
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  load(xml) {
    this.http.get(xml, {
      headers: { observe: 'response' }, responseType: 'text'
    }).subscribe(
      (x: any) => {
        // console.log('Fetched XML, now importing: ', x);
        this.modeler.importXML(x, this.handleError);
      },
      this.handleError
    );
  }

  saveDiagram(e) {
    this.modeler.saveXML({ format: true }, (err, xml) => {
      if (err) {
        console.error(err);
      } else {
        console.log(xml);
        this.setEncoded(xml, 'bpmn.xml');
      }
    });
    e.preventDefault();
    e.stopPropagation();
  }

  saveSVG(e) {
    this.modeler.saveSVG((err, svg) => {
      if (err) {
        console.error(err);
      } else {
        this.setEncoded(svg, 'bpmn.svg');
      }
    });
    e.preventDefault();
    e.stopPropagation();
  }

  setEncoded(data, name) {
    const encodedData = encodeURIComponent(data);
    if (data) {
      this.saveHref = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/bpmn20-xml;charset=UTF-8,' + encodedData);
      this.saveName = name;
    }
  }


}


