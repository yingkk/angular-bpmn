import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProvider from 'bpmn-js-properties-panel/lib/provider/bpmn';


@Component({
  selector: 'app-bpmn',
  templateUrl: './bpmn.component.html',
  styleUrls: ['./bpmn.component.scss']
})
export class BpmnComponent implements OnInit {

  private modeler;

  private readonly newDiagram = 'assets/bpmn/init.bpmn';

  public saveHref;

  public saveName = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.initBpmn();
  }

  initBpmn() {
    this.modeler = new BpmnModeler({
      container: '#js-canvas',
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        propertiesProvider,
        propertiesPanelModule
      ]
    });
    this.createDiagram();
  }

  createDiagram() {
    this.importDiagram(this.newDiagram);
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  importDiagram(xml) {
    this.http.get(xml, {
      headers: { observe: 'response' }, responseType: 'text'
    }).subscribe(
      (x: any) => {
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
