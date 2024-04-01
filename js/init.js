function init(){

  var stats = initStats();
  // creation de rendu et de la taille
  let rendu = new THREE.WebGLRenderer({ antialias: true });
  rendu.shadowMap.enabled = true;
  let scene = new THREE.Scene();   
  let camera = new THREE.PerspectiveCamera(120  , window.innerWidth / window.innerHeight, 0.1, 100);
  rendu.shadowMap.enabled = true;
  rendu.setClearColor(new THREE.Color(0xFFFFFF));
  rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
  cameraLumiere(scene,camera);
  lumiere(scene);
  renduAnim();
  var axes = new THREE.AxesHelper(1); 
  const controls = new THREE.OrbitControls(camera, rendu.domElement);
  controls.update();
  scene.add(axes);




  //* test pour comprendre l'implementation des fonctionalités de ammo.js
  /* NON FONCTIONNEL
  var clock = new THREE.Clock(); 
  Ammo().then(AmmoStart);
  function AmmoStart(){
    tmpTransformation = new Ammo.btTransform();
    initPhysicsUniverse();
    initGraphicsUniverse();
    createCube(40 , new THREE.Vector3(15, -30, 15) , 0 );
    renduAnim();
  }
  var physicsUniverse = undefined;
  var tmpTransformation = undefined;
  function initPhysicsUniverse()
  {
    var collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration();
    var dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration);
    var overlappingPairCache    = new Ammo.btDbvtBroadphase();
    var solver                  = new Ammo.btSequentialImpulseConstraintSolver();
    physicsUniverse               = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
    physicsUniverse.setGravity(new Ammo.btVector3(0, -75, 0));
  }

  function initGraphicsUniverse(){}

  var rigidBody_List = new Array();

  function createCube(scale, position, mass, rot_quaternion){
    let quaternion = undefined;
    if(rot_quaternion == null)
    {
        quaternion = {x: 0, y: 0, z: 0, w:  1};
    }
    else
    {
      quaternion = rot_quaternion;
    }
    // ------ Graphics Universe - Three.JS ------
    let newcube = new THREE.Mesh(new THREE.BoxBufferGeometry(scale, scale, scale), new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff}));
    newcube.position.set(position.x, position.y, position.z);
    scene.add(newcube);

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( position.x, position.y, position.z ) );
    transform.setRotation( new Ammo.btQuaternion( quaternion.x, quaternion.y, quaternion.z, quaternion.w ) );
    let defaultMotionState = new Ammo.btDefaultMotionState( transform );
    let structColShape = new Ammo.btBoxShape( new Ammo.btVector3( scale*0.5, scale*0.5, scale*0.5 ) );
    structColShape.setMargin( 0.05 );
    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    structColShape.calculateLocalInertia( mass, localInertia );
    let RBody_Info = new Ammo.btRigidBodyConstructionInfo( mass, defaultMotionState, structColShape, localInertia );
    let RBody = new Ammo.btRigidBody( RBody_Info );
    physicsUniverse.addRigidBody( RBody );
    newcube.userData.physicsBody = RBody;
    rigidBody_List.push(newcube);
  }

  function updatePhysicsUniverse( deltaTime )
  {
    physicsUniverse.stepSimulation( deltaTime, 10 );
    for ( let i = 0; i < rigidBody_List.length; i++ )
    {
      let Graphics_Obj = rigidBody_List[ i ];
      let Physics_Obj = Graphics_Obj.userData.physicsBody;
      let motionState = Physics_Obj.getMotionState();
      if ( motionState )
      {
          motionState.getWorldTransform( tmpTransformation );
          let new_pos = tmpTransformation.getOrigin();
          let new_qua = tmpTransformation.getRotation();
          Graphics_Obj.position.set( new_pos.x(), new_pos.y(), new_pos.z() );
          Graphics_Obj.quaternion.set( new_qua.x(), new_qua.y(), new_qua.z(), new_qua.w() );
      }
    }
  }*/

  const R  = 0.1733;
  const nb = 100 ;
  const epai = 0.03;
  let courbePara ;
  let coulHexa ;
  let coulHexa2;
  creerPiste(); 
  creerRigole();
  bouleR= creerBoule(1);
  bouleB= creerBoule(2);
  scene.add(bouleB);
  scene.add(courbePara);

  

  const p1 = new THREE.Vector3(44/371,371/371,0);
  const p2 = new THREE.Vector3(62/371,338/371,0);
  const p3 = new THREE.Vector3(63/371,305/371,0);
  const p4 = new THREE.Vector3(59/371,260/371,0);

  const q2 = new THREE.Vector3(55/371,215/371,0);
  const q3 = new THREE.Vector3(22/371,156/371,0);
  const q4 = new THREE.Vector3(20/371,128/371,0);

  const r2 = new THREE.Vector3(18/371,100/371,0);
  const r3 = new THREE.Vector3(31/371,77/371,0);
  const r4 = new THREE.Vector3(36/371,47/371,0);

  const s2 = new THREE.Vector3(41/371,17/371,0);
  const s3 = new THREE.Vector3(39/371,-16/371,0);
  const s4 = new THREE.Vector3(0/371,-16/371,0);

  let quilles = new Array(10);
  placement_quille(quilles);


  /*Test d'ajoute de detection de collision à partir de COORDONNEES
  NON FONCTIONNEL

  //checkCollision(bouleB,quilles[0]);
  function checkCollision(objet1,objet2){
    //sphere = new THREE.Mesh(new THREE.SphereGeometry(50,20,20), new THREE.MeshPhongMaterial({color : 0xFFFF00}))
    
    //sphere.copy(bouleB);

    objet1.geometry.computeBoundingBox;
    objet2.geometry.computeBoundingBox;
    objet1.updateMatrixWorld() ;
    objet2.updateMatrixWorld() ;
    
    let bb1 = objet1.geometry.computeBoundingBox.clone;
    console.log(bb1);
    let bb2 = objet2.geometry.computeBoundingBox.clone;
    console.log(bb2);
    //bb1.applyMatrix4(objet1.matrixWorld)
    //bb2.applyMatrix4(objet1.matrixWorld)
    return bb1.intersectBox(bb2);
 
  }*/


  function quille () {
    let haut = haut_quille()
    let bas = bas_quille()
    
    //Version avec 1 sphere + 2 lathe pas de raccord G1 entre les lathe et la sphere
    /*let tete = tete_quille()
    tete.position.set(0/371,130/371,r2.z)
    let fusion = bas.add(tete);    
    fusion.rotateX(-Math.PI/2);
    fusion.scale.set(0.5,0.5,0.5);
    scene.add(fusion);
    return fusion ;*/

    //version full lathe (x4)

    let geometry = new THREE.CircleGeometry(44/371,32);
    let material = new THREE.LineBasicMaterial({color : 0xff0000});
    let circle = new THREE.Mesh(geometry,material);
    circle.rotateX(-Math.PI/2);
    circle.position.setY(1)
    let fusion = haut.add(bas);
    fusion.rotateX(-Math.PI/2);
    fusion.scale.set(0.5,0.5,0.5);
    fusion.add(circle);
    scene.add(fusion);
    return fusion ;
  

    function bas_quille(){
      let lathe1 = latheBez3(100,100,p1,p2,p3,p4,"#FF0000",true,true);
      let lathe2 = latheBez3(100,100,p4,q2,q3,q4,"#F0F000",true,true); 
      let fusion = lathe1.add(lathe2);
      return fusion ;
    }

    
    function haut_quille(){
      let lathe3 = latheBez3(100,100,q4,r2,r3,r4,"#00FF00",true,true);
      let lathe4 = latheBez3(100,100,r4,s2,s3,s4,"#000FF0",true,true);
      let fusion = lathe3.add(lathe4);
      return fusion ;
    }   
    
  }

  function tete_quille(){
    let bouleGeometry = new THREE.SphereGeometry(0.07,32,32);
    let bouleMaterial = new THREE.MeshPhongMaterial({ color: "#FFFFFF" });  
    let boule = new THREE.Mesh(bouleGeometry,bouleMaterial,0);
    return boule 
  }
  
  function placement_quille (quilles){
    let cpt = 0;
    for (i=0 ; i<4 ; i++){
      for(j=0 ; j<=i ; j++){
        
        quilles[cpt]= quille();
        quilles[cpt].name = "Quille " +cpt+1 ;
        cpt++ ;
     
        
      }
    }
    for(i=0;i<10;i++){
      switch(i){
        case 0 : quilles[i].position.set(0   , -9   , 0.45); break ;
        case 1 : quilles[i].position.set(0.25, -9.25, 0.45); break ;
        case 2 : quilles[i].position.set(-.25, -9.25, 0.45); break ;
        case 3 : quilles[i].position.set(0.45, -9.5 , 0.45); break ;
        case 4 : quilles[i].position.set(0   , -9.5 , 0.45); break ;
        case 5 : quilles[i].position.set(-.45, -9.5 , 0.45); break ;
        case 6 : quilles[i].position.set(-.25, -9.75, 0.45); break ;
        case 7 : quilles[i].position.set(0.25, -9.75, 0.45); break ;
        case 8 : quilles[i].position.set(-0.8, -9.75, 0.45); break ;
        case 9 : quilles[i].position.set(0.8 , -9.75, 0.45); break ;   
      }
    }
  }


//********************************************************
//
//  P A R T I E     G E O M E T R I Q U E
//
//********************************************************


  // piste de bowling
  function creerPiste(){
    let pisteGeometry = new THREE.BoxGeometry(2,20,0.1); 
    let pisteMaterial = new THREE.MeshPhongMaterial({ color: 0xb97a57 });
    piste = new THREE.Mesh(pisteGeometry, pisteMaterial, 0);
    piste.position.set(0, 0, -0.1);
    scene.add(piste);
  }


  //boule de bowling
  function creerBoule(equipe){
    
    let bouleGeometry = new THREE.SphereGeometry(0.173,32,32);
    let bouleMaterial ;
    let boule ;
    let crbT = courbeTennis(nb,R);
    if(equipe == 1){
        coulHexa = 0xff0000 ; coulHexa2 = 0x0000ff ;   
        bouleMaterial = new THREE.MeshPhongMaterial({ color: coulHexa });  
        boule = new THREE.Mesh(bouleGeometry,bouleMaterial,0);    
     }
     else{
        coulHexa = 0x0000ff ; coulHexa2 = 0xff0000 ;
        bouleMaterial = new THREE.MeshPhongMaterial({ color: coulHexa });
        boule = new THREE.Mesh(bouleGeometry,bouleMaterial,0);
    }
    boule.position.set(0,10,0.1);
    
    let proprieteCourbe = new THREE.LineBasicMaterial({color: coulHexa2, linewidth: epai} );
    courbePara = new THREE.Line( crbT, proprieteCourbe );
    //scene.add(courbePara); 
    return boule ;
  }

  //rigole bowling
  function creerRigole(){
    let Geometry = new THREE.CylinderGeometry(0.12,0.12,20,32,32, true,Math.PI/2,Math.PI);
    let Material = new THREE.MeshPhongMaterial({color:0xaaaaaa, side:THREE.DoubleSide});
    rigoleG = new THREE.Mesh(Geometry,Material,0);
    rigoleG.position.set(-1.1,0,-0.05);
    rigoleD = new THREE.Mesh(Geometry,Material,0);
    rigoleD.position.set(1.1,0,-0.05);
    scene.add(rigoleD);
    scene.add(rigoleG);
  }

  let start = null ;
  let animation ;
  let animation2 ;
  let courbe ;
  let courbe1 ;
  let courbe2 ;
  let isLine = false ;
  let finCourbe1 = false ;

  function deplacement (num){
    let P1 ;
    let P2 ;
    let P3 ;
    let P4 ;

    let P5 ;
    let P6 ;
    let P7 ;
    let P8 ;
    courbe1 ;
    courbe2;

    const vitesse = 3;

    

    //Le premier case du switch est fonctionnel
    //Il faudra rajouter un case avec une trajectoire 
    //Qui comprend 2 courbe de bezier
    scene.remove(courbe);
    switch (num){
      case 0 :
        isLine = false ;
        P1 = cp1
        P2 = cp2
        P3 = cp3
        P4 = cp4
        P5 = cp5
        P6 = cp6
        P7 = cp7
        P8 = cp8
       
        courbe = new THREE.CubicBezierCurve3(P1,P2,P3,P4);
        courbe2 = new THREE.CubicBezierCurve3(P5,P6,P7,P8);
        curve = TraceBezierCubique(P1, P2, P3, P4,100,color,5);
        curve2= TraceBezierCubique(P5, P6, P7, P8,100,color,5);
      break ;

      default : 
        R1 = recti1
        R2 = recti2
        isLine = true ;
        var tabP = new Array(2);
        tabP[0] = R1;
        tabP[1] = R2;
        let courbePara = new THREE.BufferGeometry().setFromPoints(tabP);
        let proprieteCourbe = new THREE.LineBasicMaterial({color:color, linewidth: 0.03} );
        curve = new THREE.Line( courbePara, proprieteCourbe );
        courbe = new THREE.LineCurve(tabP[0],tabP[1]);
      break;
    }

    function animate(t) {
      if (start == null) {
        start = t;
      }
      var delai = t - start;
      courbe.getPointAt((delai * vitesse * 0.0001) % 1, bouleB.position);
      courbePara.position.set(bouleB.position.x, bouleB.position.y, bouleB.position.z );
      animation = requestAnimationFrame(animate);
      console.log("Je suis ici");
      if(isLine){
        
        if(bouleB.position.y<=-9.89){
          cancelAnimationFrame(animation);
        }
      }
      else{
        console.log((delai * vitesse * 0.0001) % 1)
        if(((delai * vitesse * 0.0001) % 1)>0.999){
          finCourbe1 = true ;
          console.log("PASSAGE COURBE 2");
          if(finCourbe1){          
            courbe = courbe2;
            finCourbe1= false .
            console.log("PASSAGE COURBE 2");
          }
          animation2 = requestAnimationFrame(animate);
          if(((delai * vitesse * 0.0001) % 1)>0.999){
              cancelAnimationFrame(animation);    
          }
        }
       
      }
      rendu.render(scene, camera);
    } 
    animate();
  }
  

  
//********************************************************
//        FONCTION GEOMETRIQUE UTILE
//********************************************************

  function courbeTennis(nb,R,){
    var tabP = new Array(nb);
    for(var k=0;k<nb;k++){
      var t2 =k/nb*2*Math.PI;
      let x0,y0,z0;
      let a = 0.75*R ;
      let b = R-a ;
      with(Math){
        x0 = a*cos(t2)+b*cos(3*t2);
        y0 = a*sin(t2)-b*sin(3*t2);
        z0 = 2*sqrt(a*b)*sin(2*t2);
      }
      tabP[k] = new THREE.Vector3(x0,y0,z0);
    }
   
    let courbePara = new THREE.BufferGeometry().setFromPoints(tabP);
    
    return courbePara;
  }
   
  
  function surfPhong(geom,coulD,transpa,bolTrans,coulSpe){
    let Material = new THREE.MeshPhongMaterial({
        color: coulD,
        opacity: transpa,
        transparent: bolTrans,
        //wireframe: false,
        specular:coulSpe,
        flatShading: true,
        side: THREE.DoubleSide,
    });
    return new THREE.Mesh(geom, Material);
  }

  function TraceBezierCubique(P0, P1, P2, P3, nbPts, coul, epaiCbe){
    let cbeBez = new THREE.CubicBezierCurve3(P0, P1, P2, P3);
    //Propriete geometrique de la courbe
    let cbeGeometry = new THREE.Geometry();
    // Points de la courbe de Bezier
    cbeGeometry.vertices = cbeBez.getPoints(nbPts);
    //Aspect de la courbe
    let material = new THREE.LineBasicMaterial(
    { color : coul ,
    linewidth: epaiCbe
    } );
    // courbe de Bezier avec les proprietes geometriques et l’aspect
    let BezierCubique = new THREE.Line( cbeGeometry, material );
    //Renvoi de la courbe pour une utilisation ulterieure
    return (BezierCubique);


  }

  function latheBez3(nbePtCbe,nbePtRot,P0,P1,P2,P3,coul,opacite,bolTranspa){
    let p0= new THREE.Vector2(P0.x,P0.y);
    let p1= new THREE.Vector2(P1.x,P1.y);
    let p2= new THREE.Vector2(P2.x,P2.y);
    let p3= new THREE.Vector2(P3.x,P3.y);
    let Cbe3 = new THREE.CubicBezierCurve(p0,p1,p2,p3);
    let points = Cbe3.getPoints(nbePtCbe);
    let latheGeometry = new THREE.LatheGeometry(points,nbePtRot,0,2*Math.PI);
    let lathe = surfPhong(latheGeometry,coul,opacite,bolTranspa,"#FFFFFF");
    return lathe;
  }// fin latheBez3
  
  
//********************************************************
//        FIN FONCTION GEOMETRIQUE UTILE
//********************************************************
  


 


//********************************************************
//
//  F I N     P A R T I E     G E O M E T R I Q U E
//
//********************************************************

  var TableauScore ; 
  var nbLancer = 0 ;
  let score = 0
  const strike = 30;
  const spare = 15;
  function comptequille (nbLancer){
    
    nbQuille = 10 ;
    
    return nbQuille ;
  }

  function compteScore(TableauScore, nbLancer){
    switch (nbLancer) {
      case 1 : 
              if (compteQuille() == 0){
                score = strike ;
                TableauScore = score;
              } 
              else {
                score = nbQuille - compteQuille();
                nbLancer++;
              };
      break;
      
      case 2 : 
              if (compteQuille() == 0){
                score = spare ;
                TableauScore = score ;
              } 
              else {
                score = score + (nbQuille-compteQuille());
                nbLancer=0;
              };
      break;
    }



  }

function testCompteScore(){
  nbLancer = 2;
  compteQuille = 5;
  compteScore(TableauScore,nbLancer);
  console.log(score);
}
 //testCompteScore()





//********************************************************
//
//  D E B U T     M E N U     G U I
//
//********************************************************


  let recti1 = new THREE.Vector3(0, 10, 0.1);
  let recti2 = new THREE.Vector3(0, -10.1, 0.1);
  
  let cp1 = new THREE.Vector3(0, 10, 0.1);
  let cp2 = new THREE.Vector3(.5, 6.6, 0.1);
  let cp3 = new THREE.Vector3(.5, 3.3, 0.1);
  let cp4 = new THREE.Vector3(0, 0, 0.1);

  let cp5 = cp4;
  let cp6 = new THREE.Vector3(-.5, -3.3, 0.1);
  let cp7 = new THREE.Vector3(-.5, -6.6, 0.1);
  let cp8 = new THREE.Vector3(0, -10, 0.1);
  let color = "#000000";

  let curve = TraceBezierCubique(scene, cp1, cp2, cp3, cp4, 100, color);
  let curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
 

  
  
  let gui = new dat.GUI();
  let menuGui = new function (){
    this.cp1X = cp1.x;
    this.cp1Y = cp1.y;
    this.cp2X = cp2.x;
    this.cp2Y = cp2.y;
    this.cp3X = cp3.x;
    this.cp3Y = cp3.y;
    this.cp4X = cp4.x;
    this.cp4Y = cp4.y;
    this.colorcbe = color;

    this.cp5X = cp4.x;
    this.cp5Y = cp4.y;
    this.cp6X = cp6.x;
    this.cp6Y = cp6.y;
    this.cp7X = cp7.x;
    this.cp7Y = cp7.y;
    this.cp8X = cp8.x;
    this.cp8Y = cp8.y;


    this.recti1X= recti1.x;
    this.recti2X= recti2.x;

  }

  
  var props = {Rectiligne:false};
  let cbeFolder = gui.addFolder("Trajectoire");
  
  let guiColor = cbeFolder.addFolder("Couleur");         
  guiColor.addColor(menuGui, "colorcbe").onChange(function (e){
    color = new THREE.Color(e);
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    curve = TraceBezierCubique(scene, cp1, cp2, cp3, cp4, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    scene.add(curve);
  });
  
  
  let typeTraj = cbeFolder.add(props,"Rectiligne").listen();
  typeTraj.onChange(function(){
    props = !props

  });
  let guiRectiligne = cbeFolder.addFolder("Rectiligne"); 

  let R1 = guiRectiligne.addFolder("R1");
  R1.add(menuGui, "recti1X", -1, 1).step(0.1).onChange(function (){
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    recti1.x = menuGui.recti1X;
  });
  
  let R2 = guiRectiligne.addFolder("R2");
  R2.add(menuGui, "recti2X", -1, 1).step(0.1).onChange(function (){
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    recti2.x = menuGui.recti2X;
  });  
  
  
  let guiCourbe1 = cbeFolder.addFolder("Courbe 1");     

  let P1 = guiCourbe1.addFolder("P1");
  P1.add(menuGui, "cp1X", -1, 1).step(0.1).onChange(function (){
    cp1.x = menuGui.cp1X;
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    courbe = new THREE.CubicBezierCurve3(cp1,cp2,cp3,cp4);
    courbe2 = new THREE.CubicBezierCurve3(cp5,cp6,cp7,cp8);
    curve = TraceBezierCubique(scene, cp1, cp2, cp3, cp4, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
   
  });

  let P2 = guiCourbe1.addFolder("P2");
  P2.add(menuGui, "cp2X", -1, 1).step(0.1).onChange(function (){
    cp2.x = menuGui.cp2X;
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    courbe = new THREE.CubicBezierCurve3(cp1,cp2,cp3,cp4);
    courbe2 = new THREE.CubicBezierCurve3(cp5,cp6,cp7,cp8);
    curve = TraceBezierCubique(scene, cp1, cp2, cp3, cp4, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    
  });


  P2.add(menuGui, "cp2Y", 0, 10).onChange(function (){
    cp2.y = menuGui.cp2Y;
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    courbe = new THREE.CubicBezierCurve3(cp1,cp2,cp3,cp4);
    courbe2 = new THREE.CubicBezierCurve3(cp5,cp6,cp7,cp8);
    curve = TraceBezierCubique(scene, cp1, cp2, cp3, cp4, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    
  });


  let P3 = guiCourbe1.addFolder("P3");
  P3.add(menuGui, "cp3X", -1, 1).step(0.1).onChange(function (){
    cp3.x = menuGui.cp3X;
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    courbe = new THREE.CubicBezierCurve3(cp1,cp2,cp3,cp4);
    courbe2 = new THREE.CubicBezierCurve3(cp5,cp6,cp7,cp8);
    curve = TraceBezierCubique(scene, cp1, cp2, cp3, cp4, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    
  });


  P3.add(menuGui, "cp3Y", 0, 10).onChange(function (){
    cp3.Y = menuGui.cp3Y;
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    courbe = new THREE.CubicBezierCurve3(cp1,cp2,cp3,cp4);
    courbe2 = new THREE.CubicBezierCurve3(cp5,cp6,cp7,cp8);
    curve = TraceBezierCubique(scene, cp1, cp2, cp3, cp4, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
   
  });

  
  let P4 = guiCourbe1.addFolder("P4");
  P4.add(menuGui, "cp4X", -1, 1).step(0.1).onChange(function (){
    cp4.x = menuGui.cp4X;
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    courbe = new THREE.CubicBezierCurve3(cp1,cp2,cp3,cp4);
    courbe2 = new THREE.CubicBezierCurve3(cp5,cp6,cp7,cp8);
    curve = TraceBezierCubique(scene, cp1, cp2, cp3, cp4, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
   
  });


  P4.add(menuGui, "cp4Y", 0, 10).onChange(function (){
    cp4.y = menuGui.cp4Y;
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    courbe = new THREE.CubicBezierCurve3(cp1,cp2,cp3,cp4);
    courbe2 = new THREE.CubicBezierCurve3(cp5,cp6,cp7,cp8);
    curve = TraceBezierCubique(scene, cp1, cp2, cp3, cp4, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    
  });

  let guiCourbe2 = cbeFolder.addFolder("Courbe 2");     

  let P6 = guiCourbe2.addFolder("P6");
  P6.add(menuGui, "cp6X", -1, 1).step(0.1).onChange(function (){
    cp6.x = menuGui.cp6X;
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    courbe = new THREE.CubicBezierCurve3(cp1,cp2,cp3,cp4);
    courbe2 = new THREE.CubicBezierCurve3(cp5,cp6,cp7,cp8);
    curve = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    
  });


  P6.add(menuGui, "cp6Y", -10, 0).onChange(function (){
    cp6.y = menuGui.cp6Y;
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    courbe = new THREE.CubicBezierCurve3(cp1,cp2,cp3,cp4);
    courbe2 = new THREE.CubicBezierCurve3(cp5,cp6,cp7,cp8);
    curve = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    
  });
  

  let P7 = guiCourbe2.addFolder("P7");
  P7.add(menuGui, "cp7X", -1, 1).step(0.1).onChange(function (){
    cp7.x = menuGui.cp7X;
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    courbe = new THREE.CubicBezierCurve3(cp1,cp2,cp3,cp4);
    courbe2 = new THREE.CubicBezierCurve3(cp5,cp6,cp7,cp8);
    curve = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    
  });


  P7.add(menuGui, "cp7Y", -10, 0).onChange(function (){
    cp7.y = menuGui.cp7Y;
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    courbe = new THREE.CubicBezierCurve3(cp1,cp2,cp3,cp4);
    courbe2 = new THREE.CubicBezierCurve3(cp5,cp6,cp7,cp8);
    curve = TraceBezierCubique(scene, cp1, cp2, cp3, cp4, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    
  });

  
  let P8 = guiCourbe2.addFolder("P8");
  P8.add(menuGui, "cp8X", -1, 1).step(0.1).onChange(function (){
    cp8.x = menuGui.cp8X;
    if(curve != null) scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
    courbe = new THREE.CubicBezierCurve3(cp1,cp2,cp3,cp4);
    courbe2 = new THREE.CubicBezierCurve3(cp5,cp6,cp7,cp8);
    curve = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    curve2 = TraceBezierCubique(scene, cp5, cp6, cp7, cp8, 100, color);
    
  });

  var obj = { Lancer:function(){ 
    if(!props){
      scene.remove(curve);
      if(curve2 != null) scene.remove(curve2);
      
      deplacement();
      scene.add(curve);
    }
    else{
      scene.remove(curve);
      scene.remove(curve2);
      finCourbe1 = false;
      deplacement(0);  
      scene.add(curve);
      scene.add(curve2);
    }
    }};
  gui.add(obj,"Lancer");

  var obj = { Stop:function(){ 
    cancelAnimationFrame(animation);
    cancelAnimationFrame(animation2);
    bouleB.position.set(0,9.9,.2) ; 
    courbePara.position.set(bouleB.position.x, bouleB.position.y, bouleB.position.z );
    scene.remove(curve);
    if(curve2 != null) scene.remove(curve2);
  }};
  gui.add(obj,"Stop");
  courbePara.position.set(bouleB.position.x, bouleB.position.y, bouleB.position.z );
//********************************************************
//
//  F I N     M E N U     G U I
//
//********************************************************


    
  // ajoute le rendu dans l'element HTML
 document.getElementById("webgl").appendChild(rendu.domElement);
   


  // affichage de la scene
 rendu.render(scene, camera);
  
  
 function reAffichage() {
  setTimeout(function () { 
 
  }, 200);// fin setTimeout(function ()
    // render avec requestAnimationFrame
  requestAnimationFrame(renduAnim);
  rendu.render(scene, camera);
 }// fin fonction reAffichage()
 
 
  function renduAnim() {
    stats.update();
    // render avec requestAnimationFrame
    //let deltaTime = clock.getDelta();
    //updatePhysicsUniverse( deltaTime );
    requestAnimationFrame(renduAnim);
    // ajoute le rendu dans l'element HTML
    rendu.render(scene, camera);
  }
 
} // fin fonction init()