# angularproject
this project wil help you to understand how how binding data between components using angular.
   
   appComponent -> parent component
   
   server-element-component -> child component of the appComponent
   
   cockpit-component -> child component of the appComponent
   
   
# cockpit-component provide output to the appcomponent
 
 for that use @Output in the  cockpit-component.ts. this component get data from the their html file and send that data to the appcomponent
   
         + cockpit-component.html

                       <div>
                      <p>Add new server or blue print</p>
                      <div>

                        <label>server name</label>
                        <input type="text" [(ngModel)]="newServerName" id="newServerName">

                      </div>

                      <div>

                          <label  >server content</label>
                          <input type="text" [(ngModel)]="newServerContent" id="newServerContent">

                        </div>
                        <br>
                        <div>
                          <button (click)="onAddServer()">Add Server</button>
                        </div>

                        <div>
                            <button (click)="onAddBluePrint()">Add BluePrint</button>
                          </div>
                    </div>


         + cockpit-component.ts
         
                   import { Component, OnInit , EventEmitter , Output} from '@angular/core';


                  @Component({
                    selector: 'app-cockpit',
                    templateUrl: './cockpit.component.html',
                    styleUrls: ['./cockpit.component.css']
                  })
                  export class CockpitComponent implements OnInit {
                    @Output() serverCreated= new EventEmitter();
                    @Output() bluprintCreated=new EventEmitter();
                    newServerName;
                    newServerContent;


                    constructor() { }

                    ngOnInit() {
                    }
                    onAddServer(){
                      console.log(11111);
                  this.serverCreated.emit({
                    name:this.newServerName,
                    content:this.newServerContent

                  });
                    }  
                    onAddBluePrint(){
                      this.bluprintCreated.emit({
                        name:this.newServerName,
                        content:this.newServerContent

                      });
                    }

}

   
 # server-element-component get input from the appComponent
  
    for that we use @Input in the server-element-component.ts  and view that data using their html file
         
         + server-element-component.ts file

                  import { Component, OnInit, Input } from '@angular/core';

                    @Component({
                      selector: 'app-server-element',
                      templateUrl: './server-element.component.html',
                      styleUrls: ['./server-element.component.css']
                    })
                    export class ServerElementComponent implements OnInit {
                      @Input('srcElement') element: { type: string, name: string, content: string }
                      constructor() { }

                      ngOnInit() {
                      }

                    }


          + server-element-component.html file
                      
                      
                     <div>{{element.name}}</div>
                    <div>
                      <p>
                        <strong *ngIf="element.type ==='server'">{{element.content}}</strong>
                        <em *ngIf="element.type ==='blueprint'">{{element.content}}</em>
                      </p>
                    </div>
                    
               
       
 # appComponent is the root component for both server-element-component and cockpit-componen. That handle that both component data.
    
    
      
         + app-component.ts
         
                     import { Component } from '@angular/core';

                    @Component({
                      selector: 'app-root',
                      templateUrl: './app.component.html',
                      styleUrls: ['./app.component.css']
                    })
                    export class AppComponent {
                      serverElements =[];

                      onServerCreated (serverData : {name : string , content: string}){
                        console.log("aaaaaaaaaaaaa");
                        this.serverElements.push(
                          {
                            type:'server',
                            name:serverData.name,
                            content:serverData.content
                          }
                        );
                        console.log(this.serverElements);
                      }
                      onBluprintCreated(bluprintData : {name : string , content: string}){
                        this.serverElements.push(
                          {
                            type:'blueprint',
                            name:bluprintData.name,
                            content:bluprintData.content
                          }
                        );
                    }

                    }

         + app-component.html
         
         
                     <div class="container">
                    <div>
                      <app-cockpit (serverCreated)="onServerCreated($event)" (bluprintCreated)="onBluprintCreated($event)"></app-cockpit>
                    </div>
                    <hr>
                  <div>
                      <app-server-element *ngFor="let serverElement of serverElements" [srcElement]="serverElement"></app-server-element>
                  </div>
                  </div>

    
    
    
    
    
    
    
    
