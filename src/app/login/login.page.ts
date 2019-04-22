import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoGuard } from '../guards/autenticacao.guard';
import { NavController, MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { UsuarioService } from '../provider/usuario.service';
import { DatabaseService } from '../provider/database.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router, private menuCtrl:MenuController, private toastController: ToastController, private loadingController: LoadingController, private alertController: AlertController, private usuarioService: UsuarioService, private db:DatabaseService) { }


  ngOnInit() {    
    this.formulario = this.formBuilder.group({
      email:['', [Validators.email, Validators.required]],
      senha:['', [Validators.required, Validators.minLength(6)]]
    });
    this.db.createDatabase();
  }

  async presentToast(mensagem) { 
    const toast = await this.toastController.create({
       message: mensagem,
       position: 'bottom', 
       closeButtonText: "[X]", 
       showCloseButton: true, 
       duration: 2000 
    });
    toast.present();
  }

  clicou() {
    let logar = this.usuarioService.logar(this.formulario.get('email').value, this.formulario.get('senha').value);
    if (logar) {                
          this.router.navigateByUrl('home/geral');
    } else  {
      this.presentToast('Email Ou Senha Incorreto(s)');  
      
    }
  }

  // clicou() {
  //   if (this.formulario.valid && 
  //       this.formulario.get('email').value == "teste@teste.com" &&
  //       this.formulario.get('senha').value == "123456") {       
  //         this.presentToast('Login Efetuado');
  //         this.router.navigateByUrl('home/geral');
  //   } else  {
  //     this.presentToast('Email Ou Senha Incorreto(s)');  
      
  //   }
  // }

  async cadastrar() {
    const alert = await this.alertController.create({
       header: 'Cadastrar-se',
       inputs: [
   {name: "login", type:"email", placeholder:"Digite email"},
   {name: "senha", type: "password", placeholder: "Senha"}
       ],
       buttons: [
   { text: 'Cancelar' }, 
   { text: 'Cadastrar', handler: (data) => { 
        console.log('Campo login: ' + data.login);
        console.log('Campo senha: ' + data.senha);
       }
   }
       ]
    });
    alert.present();
 }

}
