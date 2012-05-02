public class rajamantri extends Activity {
    
	
	@Override
	public void onbackpressed() {
		

		
	}

	@Override
	protected void onpostresume() {
		// TODO Auto-generated method stub
		super.onpostresume();
	}

	@Override
	public boolean onkeydown(int keyCode, KeyEvent event) {
		AlertDialog dialog = new AlertDialog.Builder(this).create();
		dialog.setTitle("Exit game!");
		dialog.setMessage("Are you sure you want to exit the game?");
		dialog.setButton("Exit", new DialogInterface.OnClickListener() {
			
			public void onClick(DialogInterface dialog, int which) {
				
				finish();
				
			}
		});
		dialog.setButton2("Cancel", new DialogInterface.OnClickListener() {
			
			public void onClick(DialogInterface dialog, int which) {
				
				dialog.dismiss();
				
			}
		});
		dialog.show();
		return super.onKeyDown(keyCode, event);
	}

	@Override
	public void onlowmemory() {
		AlertDialog dialog = new AlertDialog.Builder(this).create();
		dialog.setTitle("Low memory!");
		dialog.setMessage("Too many apps open, kindly close some other apps and try again!");
		dialog.setButton("Exit", new DialogInterface.OnClickListener() {
			
			public void onClick(DialogInterface dialog, int which) {
				
				finish();
				
			}
		});
		
		dialog.show();

		
		super.onLowMemory();
	}

	@Override
	protected void onPause() {
		// TODO Auto-generated method stub
		super.onPause();
	}

	String[] solutionArray = { "RAJA", "MANTRI", "CHOR", "SIPAHI"};
	String[] playersArray = {"Player1", "Player2", "Player3", "Player4"};
	static String player1_name = "" ;
	static String player2_name = "";
	static String player3_name = "";
	static String player4_name = "";
	static String player1_role = "";
	static String player2_role = "";
	static String player3_role = "";
	static String player4_role = "";
	static boolean guess = false;
	static String player1 = "";
	static String player2 = "";
	static String player3 = "";
	static String player4 = "";
	static int i=0,j=0,k=0,l=0;
	static int p1score = 0;
	static int p2score = 0;
	static int p3score = 0;
	static int p4score = 0;
	int count = 0;
	
	Button btnRajaMantri;
	Button btnHelp;
	ImageView btn9;
	Button btnPlay;
	static Button btnPod1;
	static Button btnPod2;
	static Button btnPod3;
	static Button btnPod4;
	Button btnShowResult;
	Button btnRestart;
	Button btnSignin;
	Button btnGuess;
	EditText editTxtPlayer1;
	EditText editTxtPlayer2;
	EditText editTxtPlayer3;
	EditText editTxtPlayer4;
	EditText edt2;
	EditText edt3;
	EditText edt4;
	
	TextView lblPlayer1;
	TextView lblPlayer2;
	TextView lblPlayer3;
	TextView lblPlayer4;
	static TextView txtTurn;
	static TextView txtPlayer1;
	static TextView txtPlayer2;
	static TextView txtPlayer3;
	static TextView txtPlayer4;
	Bundle savedInstanceState2;
	Button btnMainMenu;
    
	String nextTurn = "";
	
	
    public void onRestart(){
    	
    	super.onRestart();
    /*	player1_name = "" ;
    	player2_name = "";
    	player3_name = "";
    	player4_name = "";
    	guess = false;
    	player1 = "";
    	player2 = "";
    	player3 = "";
    	player4 = "";
    	i=0;j=0;k=0;l=0;
    	p1score = 0;
    	p2score = 0;
    	p3score = 0;
    	p4score = 0;*/
    	
    	
    }
    
    public void onResume(){
    	
    	super.onResume();
    	/*player1_name = "" ;
    	player2_name = "";
    	player3_name = "";
    	player4_name = "";
    	guess = false;
    	player1 = "";
    	player2 = "";
    	player3 = "";
    	player4 = "";
    	i=0;j=0;k=0;l=0;
    	p1score = 0;
    	p2score = 0;
    	p3score = 0;
    	p4score = 0;*/
    	
    	
    }




    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.welcome);
      
        i = 0;
        j = 0;
        k = 0;
        l = 0;
        btnHelp = (Button)findViewById(R.id.btnHelp);
        btnHelp.setOnClickListener(new OnClickListener() {
			
			public void onClick(View v) {
				setContentView(R.layout.help);
				 // Create the adView
			    AdView adView = new AdView(RajaMantri.this, AdSize.BANNER, "a14e156523d01de");
			    // Lookup your LinearLayout assuming it’s been given
			    // the attribute android:id="@+id/mainLayout"
			    LinearLayout layout = (LinearLayout)findViewById(R.id.mainLayoutHelp);
			    // Add the adView to it
			    layout.addView(adView);
			    // Initiate a generic request to load it with an ad
			    adView.loadAd(new AdRequest());
				TextView txtHelp = (TextView)findViewById(R.id.txtHelp);
				String text = "Welcome to nostalgia! This is the paper free version of Raja Mantri Chor Sipahi.\n\nThe game involves bluffing with facial expressions and good guessing. This is a very popular childhood game in India played among kids often during their long summer vacations.\n\nThe game has 4 paper chits with Chor (thief), Sipahi (police), Raja (king) and Mantri (minister). The chits are folded at the start of the game and one of the 4 players will press SHUFFLE each one of the four players is supposed to secretly (by taking the phone and not letting the others see it)pick one chit by clicking on it, the player then clicks on the chit again to fold it back. All the players will then secretly open their chits and read what they have got. \n\nThe player who gets the chit with Raja written on it will say MERA MANTRI KAUN? (Who is my minister?). The player who got the chit with Mantri will say MEIN! (Me), The player with Raja will then say CHOR SIPAHI KA PATA LAGAO (find out who is the theif and who is the soldier). The player with Mantri will then guess who is the Chor (Thief), if he is wrong then his points are deducted and if he is correct he gets more points and the points from the player who got Chor (Thief) are deducted.\n\nIf the guess is correct the player with Chor is wrapped on his wrist by the Mantri, and if the Mantri is wrong then the Chor gets to hit his wrist.";
				txtHelp.setText(text);
				Button btnBack = (Button)findViewById(R.id.btnMainMenuHelp);
				btnBack.setOnClickListener(new OnClickListener() {
					
					public void onClick(View v) {
						
						Intent i = new Intent(RajaMantri.this, RajaMantri.class);
						RajaMantri.this.startActivity(i);
						finish();
						
					}
				});
			}
		});
        btnRajaMantri = (Button) findViewById(R.id.btnRajaMantri);
        btnRajaMantri.setOnClickListener(new OnClickListener() {
        	
 		public void onClick(View v) {
 			// TODO Auto-generated method stub
 		setContentView(R.layout.rmcsp);	
 		 // Create the adView
	    AdView adView = new AdView(RajaMantri.this, AdSize.BANNER, "a14e156523d01de");
	    // Lookup your LinearLayout assuming it’s been given
	    // the attribute android:id="@+id/mainLayout"
	    LinearLayout layout = (LinearLayout)findViewById(R.id.mainLayoutPlayer);
	    // Add the adView to it
	    layout.addView(adView);
	    // Initiate a generic request to load it with an ad
	    adView.loadAd(new AdRequest());
	    
 		editTxtPlayer1 = (EditText) findViewById(R.id.editTxtPlayer1);
 		editTxtPlayer2 = (EditText)findViewById(R.id.editTxtPlayer2);
 		editTxtPlayer3 = (EditText)findViewById(R.id.editTxtPlayer3);
 		editTxtPlayer4 = (EditText)findViewById(R.id.editTxtPlayer4);
 		
 		lblPlayer1 = (TextView) findViewById(R.id.lblPlayer1);
 		lblPlayer2 = (TextView) findViewById(R.id.lblPlayer2);
 		lblPlayer3 = (TextView) findViewById(R.id.lblPlayer3);
 		lblPlayer4 = (TextView) findViewById(R.id.lblPlayer4);
 		
 		Display display = getWindowManager().getDefaultDisplay(); 
 		int width = display.getWidth();
 		int height = display.getHeight();
 		
 		
 		
 		lblPlayer1.setGravity(Gravity.CENTER_HORIZONTAL);
 		lblPlayer2.setGravity(Gravity.CENTER_HORIZONTAL);
 		lblPlayer3.setGravity(Gravity.CENTER_HORIZONTAL);
 		lblPlayer4.setGravity(Gravity.CENTER_HORIZONTAL);
 		
 		
 		Log.v("AkandBakar", "Playernames:" + player1_name);
 		Log.v("AkandBakar", "Playernames:" + player2_name);
 		Log.v("AkandBakar", "Playernames:" + player3_name);
 		Log.v("AkandBakar", "Playernames:" + player4_name);
 		
 		btnMainMenu = (Button) findViewById(R.id.btnMainMenu);
 		btnMainMenu.setOnClickListener(new OnClickListener() {
			
			
			public void onClick(View v) {
				Intent i = new Intent(RajaMantri.this, RajaMantri.class);
				RajaMantri.this.startActivity(i);
				finish();
				
			}
		});
 		
 		btnSignin = (Button) findViewById(R.id.btnsignin);
 		btnSignin.setOnClickListener(new OnClickListener() {
			
			public void onClick(View v) {
				// TODO Auto-generated method stub
				
				player1_name = editTxtPlayer1.getText().toString();
		 		player2_name = editTxtPlayer2.getText().toString();
		 		player3_name = editTxtPlayer3.getText().toString();
		 		player4_name = editTxtPlayer4.getText().toString();
		 		
		 		
				if(player1_name.equals("")||player2_name.equals("")||player3_name.equals("")||player4_name.equals("")){
					
					Toast toast = Toast.makeText(getBaseContext(), "Enter player names!", 8000);
					toast.show();
					
				}else{
					setContentView(R.layout.rmcsgnew);	
					 // Create the adView
				    AdView adView = new AdView(RajaMantri.this, AdSize.BANNER, "a14e156523d01de");
				    // Lookup your LinearLayout assuming it’s been given
				    // the attribute android:id="@+id/mainLayout"
				    LinearLayout layout = (LinearLayout)findViewById(R.id.mainLayout);
				    // Add the adView to it
				    layout.addView(adView);
				    // Initiate a generic request to load it with an ad
				    adView.loadAd(new AdRequest());

					txtTurn = (TextView)findViewById(R.id.txtTurn);
					txtTurn.setText("Click on SHUFFLE!");
					playersArray[0] = player1_name;
			 		playersArray[1] = player2_name;
			 		playersArray[2] = player3_name;
			 		playersArray[3] = player4_name;
			 		
			 		
			 		
					txtPlayer1 = (TextView) findViewById(R.id.txtPlayer1);
					txtPlayer1.setText("1."+player1_name + " [" + p1score + "]");
					
					txtPlayer2 = (TextView) findViewById(R.id.txtPlayer2);
					txtPlayer2.setText("2."+player2_name+ " [" + p2score + "]");
					
					txtPlayer3 = (TextView) findViewById(R.id.txtPlayer3);
					txtPlayer3.setText("3."+player3_name+ " [" + p3score + "]");
					
					txtPlayer4 = (TextView) findViewById(R.id.txtPlayer4);
					txtPlayer4.setText("4."+player4_name+ " [" + p4score + "]");
					
				btnPlay = (Button) findViewById(R.id.btnPlay);
				
				btnPlay.setOnClickListener(new OnClickListener() {
		 			
		 			public void onClick(View v) {
		 				// TODO Auto-generated method stub
		 				
		 				if(btnPlay.getText().equals("SHUFFLE")){
		 				
		 					RajaMantri.this.shuffle();
		 					
		 				}else{
		 					
		 					
		 					RajaMantri.this.makeGuess();
										
		 					Log.v("RajaMantri", "########## Player Name:" + player1_name +" Role:" + player1_role);
		 					Log.v("RajaMantri", "########## Player Name:" + player2_name +" Role:" + player2_role);
		 					Log.v("RajaMantri", "########## Player Name:" + player3_name +" Role:" + player3_role);
		 					Log.v("RajaMantri", "########## Player Name:" + player4_name +" Role:" + player4_role);
						}
						
		 				
		 			}
		 		});
		         
		         
		         
				}
		         
		     }
		     
		 	});
			}

		
		});
 		 
       
    }
    
    
    public void makeGuess(){
    	
    	btnPlay.setText("SHUFFLE");
			count = 0;
			btnPlay.setText("SHUFFLE");
			
			btnPod1.setClickable(true);
			btnPod2.setClickable(true);
			btnPod3.setClickable(true);
			btnPod4.setClickable(true);
			
		if(player1.equals("RAJA")){
			
			btnPod1.setText("RAJA");
			btnPod1.setBackgroundResource(R.drawable.podopen);
			btnPod1.setClickable(false);
		}
		if(player2.equals("RAJA")){
			
			btnPod2.setText("RAJA");
			btnPod2.setBackgroundResource(R.drawable.podopen);
			btnPod2.setClickable(false);
		}
		if(player3.equals("RAJA")){

			btnPod3.setText("RAJA");
			btnPod3.setBackgroundResource(R.drawable.podopen);
			btnPod3.setClickable(false);
		}
		if(player4.equals("RAJA")){

			btnPod4.setText("RAJA");
			btnPod4.setBackgroundResource(R.drawable.podopen);
			btnPod4.setClickable(false);
		}

		if(player1.equals("MANTRI")){
			
			btnPod1.setText("MANTRI");
			btnPod1.setBackgroundResource(R.drawable.podopen);
			btnPod1.setClickable(false);
		}
		if(player2.equals("MANTRI")){
			
			btnPod2.setText("MANTRI");
			btnPod2.setBackgroundResource(R.drawable.podopen);
			btnPod2.setClickable(false);
		}
		if(player3.equals("MANTRI")){

			btnPod3.setText("MANTRI");
			btnPod3.setBackgroundResource(R.drawable.podopen);
			btnPod3.setClickable(false);
		}
		if(player4.equals("MANTRI")){

			btnPod4.setText("MANTRI");
			btnPod4.setBackgroundResource(R.drawable.podopen);
			btnPod4.setClickable(false);
			
		}
		
		if(player1_role.equals("MANTRI")){
			txtTurn.setText(player1_name + " will find the CHOR!");
		}
		if(player2_role.equals("MANTRI")){
			txtTurn.setText(player2_name + " will find the CHOR!");
		}
		if(player3_role.equals("MANTRI")){
			txtTurn.setText(player3_name + " will find the CHOR!");
		}
		if(player4_role.equals("MANTRI")){
			txtTurn.setText(player4_name + " will find the CHOR!");
		}
		
		Log.v("AkhandBakar","#########" + btnPod1.getText());
		
		if(btnPod1.getText().equals("")){
			
			btnPod1.setOnClickListener(new OnClickListener() {
				
			
				public void onClick(View v) {
					// TODO Auto-generated method stub
					Log.v("AkhandBakar","#########" + player1);
					if(player1.equals("CHOR")){
					
						RajaMantri.guess = true;
						btnPod1.setBackgroundResource(R.drawable.podopen);
						btnPod1.setText("CHOR");
						
					}else{
						
						RajaMantri.guess = false;
						btnPod1.setBackgroundResource(R.drawable.podopen);
						btnPod1.setText("SIPAHI");
					}
					btnPod1.setClickable(false);
					btnPod2.setClickable(false);
					btnPod3.setClickable(false);
					btnPod4.setClickable(false);
					updateScore();
				}
			});
		}	
		
		
		Log.v("AkhandBakar","#########" + btnPod2.getText());
		if(btnPod2.getText().equals("")){
			
			btnPod2.setOnClickListener(new OnClickListener() {
				
				public void onClick(View v) {
					// TODO Auto-generated method stub
					Log.v("AkhandBakar","#########" + player2);
					if(player2.equals("CHOR")){
					
						RajaMantri.guess = true;
						btnPod2.setBackgroundResource(R.drawable.podopen);
						btnPod2.setText("CHOR");
					}else{
						
						RajaMantri.guess = false;
						btnPod2.setBackgroundResource(R.drawable.podopen);
						btnPod2.setText("SIPAHI");
						
					}
					btnPod1.setClickable(false);
					btnPod2.setClickable(false);
					btnPod3.setClickable(false);
					btnPod4.setClickable(false);
					updateScore();
				}
			});
		}	
    	
		Log.v("AkhandBakar","#########" + btnPod3.getText());
		if(btnPod3.getText().equals("")){
			
			btnPod3.setOnClickListener(new OnClickListener() {
				
				
				public void onClick(View v) {
					// TODO Auto-generated method stub
					Log.v("AkhandBakar","#########" + player3);
					if(player3.equals("CHOR")){
					
						RajaMantri.guess = true;
						btnPod3.setBackgroundResource(R.drawable.podopen);
						btnPod3.setText("CHOR");
					}else{
						
						RajaMantri.guess = false;
						btnPod3.setBackgroundResource(R.drawable.podopen);
						btnPod3.setText("SIPAHI");
						
					}
					btnPod1.setClickable(false);
					btnPod2.setClickable(false);
					btnPod3.setClickable(false);
					btnPod4.setClickable(false);
					updateScore();
				}
			});
		}
    	
		
		Log.v("AkhandBakar","#########" + btnPod4.getText());
		if(btnPod4.getText().equals("")){
			
			btnPod4.setOnClickListener(new OnClickListener() {
				
			
				public void onClick(View v) {
					// TODO Auto-generated method stub
					Log.v("AkhandBakar","#########" + player4);
					if(player4.equals("CHOR")){
					
						RajaMantri.guess = true;
						btnPod4.setBackgroundResource(R.drawable.podopen);
						btnPod4.setText("CHOR");
					}else{
						
						RajaMantri.guess = false;
						btnPod4.setBackgroundResource(R.drawable.podopen);
						btnPod4.setText("SIPAHI");
						
					}
					btnPod1.setClickable(false);
					btnPod2.setClickable(false);
					btnPod3.setClickable(false);
					btnPod4.setClickable(false);
					updateScore();
				}
			});
		}
		
    }
    
    
    public void shuffle(){
    	
    	btnPlay.setText("Guess");
			btnPlay.setClickable(false);
			shuffleArray(solutionArray);
			txtTurn.setText(player1_name + "'s" + " turn!");
			nextTurn = player2_name;
			btnPod1 = (Button)findViewById(R.id.btnPod1);
			btnPod1.setBackgroundResource(R.drawable.podtlclosed);
			btnPod1.setOnClickListener(new OnClickListener() {
				
				public void onClick(View v) {
					// TODO Auto-generated method stub
					player1 = solutionArray[0];
					btnPod1.setText(player1);
					btnPod1.setBackgroundResource(R.drawable.podopen);
					btnPod2.setClickable(false);
					btnPod3.setClickable(false);
					btnPod4.setClickable(false);
					if(txtTurn.getText().equals(player1_name + "'s" + " turn!")){
						
						if(player1.equals("MANTRI")){
							
							player1_role = "MANTRI";
						}
						if(player1.equals("RAJA")){
							
							player1_role = "RAJA";
						}
						if(player1.equals("SIPAHI")){

							player1_role = "SIPAHI";
						}
						if(player1.equals("CHOR")){
							
							player1_role = "CHOR";
						}
				    	

						nextTurn = player2_name + "'s" + " turn!";
						
					}
					if(txtTurn.getText().equals(player2_name + "'s" + " turn!")){
						
						if(player1.equals("MANTRI")){
							
							player2_role = "MANTRI";
						}
						if(player1.equals("RAJA")){
							
							player2_role = "RAJA";
						}
						if(player1.equals("SIPAHI")){

							player2_role = "SIPAHI";
						}
						if(player1.equals("CHOR")){
							
							player2_role = "CHOR";
						}
				    	
						nextTurn = player3_name + "'s" + " turn!";
						
					}
					if(txtTurn.getText().equals(player3_name + "'s" + " turn!")){
						
						if(player1.equals("MANTRI")){
							
							player3_role = "MANTRI";
						}
						if(player1.equals("RAJA")){
							
							player3_role = "RAJA";
						}
						if(player1.equals("SIPAHI")){

							player3_role = "SIPAHI";
						}
						if(player1.equals("CHOR")){
							
							player3_role = "CHOR";
						}
				    	
						nextTurn = player4_name + "'s" + " turn!";
						
					}
					
					if(txtTurn.getText().equals(player4_name + "'s" + " turn!")){
						
						if(player1.equals("MANTRI")){
							
							player4_role = "MANTRI";
						}
						if(player1.equals("RAJA")){
							
							player4_role = "RAJA";
						}
						if(player1.equals("SIPAHI")){

							player4_role = "SIPAHI";
						}
						if(player1.equals("CHOR")){
							
							player4_role = "CHOR";
						}
				    	
						
						nextTurn = "Click on Guess!";
						
					}
					
					txtTurn.setText("Click again to close the chit!");
				
					
					
					btnPod1.setOnClickListener(new OnClickListener() {
						
						public void onClick(View v) {
							// TODO Auto-generated method stub
							btnPod1.setClickable(false);
							count++;
							btnPod1.setText("");
							btnPod1.setBackgroundResource(R.drawable.podtlhalf);
							txtTurn.setText(nextTurn);
							btnPod2.setClickable(true);
							btnPod3.setClickable(true);
							btnPod4.setClickable(true);
							if(count == 4){
								
								txtTurn.setText("Click on Guess!");
								btnPlay.setClickable(true);
								count = 0;
								
							}
						}
					});
				}
			});
			
			btnPod2 = (Button)findViewById(R.id.btnPod2);
			btnPod2.setBackgroundResource(R.drawable.podtrclosed);
			btnPod2.setOnClickListener(new OnClickListener() {
					
					public void onClick(View v) {
						// TODO Auto-generated method stub
						player2 = solutionArray[1];
						btnPod2.setText(player2);
						btnPod2.setBackgroundResource(R.drawable.podopen);
						btnPod1.setClickable(false);
						btnPod3.setClickable(false);
						btnPod4.setClickable(false);
						if(txtTurn.getText().equals(player1_name + "'s" + " turn!")){
							
							if(player2.equals("MANTRI")){
								
								player1_role = "MANTRI";
							}
							if(player2.equals("RAJA")){
								
								player1_role = "RAJA";
							}
							if(player2.equals("SIPAHI")){

								player1_role = "SIPAHI";
							}
							if(player2.equals("CHOR")){
								
								player1_role = "CHOR";
							}
					    	
							nextTurn = player2_name+ "'s" + " turn!";
							
						}
						if(txtTurn.getText().equals(player2_name + "'s" + " turn!")){
							
							if(player2.equals("MANTRI")){
								
								player2_role = "MANTRI";
							}
							if(player2.equals("RAJA")){
								
								player2_role = "RAJA";
							}
							if(player2.equals("SIPAHI")){

								player2_role = "SIPAHI";
							}
							if(player2.equals("CHOR")){
								
								player2_role = "CHOR";
							}
					    	
							nextTurn = player3_name+ "'s" + " turn!";
							
						}
						if(txtTurn.getText().equals(player3_name + "'s" + " turn!")){
							
							if(player2.equals("MANTRI")){
								
								player3_role = "MANTRI";
							}
							if(player2.equals("RAJA")){
								
								player3_role = "RAJA";
							}
							if(player2.equals("SIPAHI")){

								player3_role = "SIPAHI";
							}
							if(player2.equals("CHOR")){
								
								player3_role = "CHOR";
							}
					    	
							nextTurn = player4_name+ "'s" + " turn!";
							
						}
						if(txtTurn.getText().equals(player4_name + "'s" + " turn!")){
							
							if(player2.equals("MANTRI")){
								
								player4_role = "MANTRI";
							}
							if(player2.equals("RAJA")){
								
								player4_role = "RAJA";
							}
							if(player2.equals("SIPAHI")){

								player4_role = "SIPAHI";
							}
							if(player2.equals("CHOR")){
								
								player4_role = "CHOR";
							}
					    	
							nextTurn = "Click on Guess!";
							
						}
						txtTurn.setText("Click again to close the chit!");
						btnPod2.setOnClickListener(new OnClickListener() {
							
							public void onClick(View v) {
								// TODO Auto-generated method stub
								btnPod2.setClickable(false);
								count++;
								btnPod2.setText("");
								btnPod2.setBackgroundResource(R.drawable.podtrhalf);
								txtTurn.setText(nextTurn);
								btnPod1.setClickable(true);
								btnPod3.setClickable(true);
								btnPod4.setClickable(true);
								if(count == 4){
									
									txtTurn.setText("Click on Guess!");
									btnPlay.setClickable(true);
									count = 0;
									
								}
							}
						});
					}
				});
		        
		        
			btnPod3 = (Button)findViewById(R.id.btnPod3);
			btnPod3.setBackgroundResource(R.drawable.podblclosed);
			btnPod3.setOnClickListener(new OnClickListener() {
					
					public void onClick(View v) {
						// TODO Auto-generated method stub
						player3 = solutionArray[2];
						btnPod3.setText(player3);
						btnPod3.setBackgroundResource(R.drawable.podopen);

						btnPod2.setClickable(false);
						btnPod1.setClickable(false);
						btnPod4.setClickable(false);
						if(txtTurn.getText().equals(player1_name + "'s" + " turn!")){
							
							if(player3.equals("MANTRI")){
								
								player1_role = "MANTRI";
							}
							if(player3.equals("RAJA")){
								
								player1_role = "RAJA";
							}
							if(player3.equals("SIPAHI")){

								player1_role = "SIPAHI";
							}
							if(player3.equals("CHOR")){
								
								player1_role = "CHOR";
							}
					    	
							nextTurn = player2_name+ "'s" + " turn!";
							
						}
						if(txtTurn.getText().equals(player2_name + "'s" + " turn!")){
							
							if(player3.equals("MANTRI")){
								
								player2_role = "MANTRI";
							}
							if(player3.equals("RAJA")){
								
								player2_role = "RAJA";
							}
							if(player3.equals("SIPAHI")){

								player2_role = "SIPAHI";
							}
							if(player3.equals("CHOR")){
								
								player2_role = "CHOR";
							}
					    	
							nextTurn = player3_name+ "'s" + " turn!";
							
						}
						if(txtTurn.getText().equals(player3_name + "'s" + " turn!")){
							
							if(player3.equals("MANTRI")){
								
								player3_role = "MANTRI";
							}
							if(player3.equals("RAJA")){
								
								player3_role = "RAJA";
							}
							if(player3.equals("SIPAHI")){

								player3_role = "SIPAHI";
							}
							if(player3.equals("CHOR")){
								
								player3_role = "CHOR";
							}
							nextTurn = player4_name+ "'s" + " turn!";
							
						}
						if(txtTurn.getText().equals(player4_name + "'s" + " turn!")){
							
							if(player3.equals("MANTRI")){
								
								player4_role = "MANTRI";
							}
							if(player3.equals("RAJA")){
								
								player4_role = "RAJA";
							}
							if(player3.equals("SIPAHI")){

								player4_role = "SIPAHI";
							}
							if(player3.equals("CHOR")){
								
								player4_role = "CHOR";
							}
							nextTurn = "Click on Guess!";
							
						}

						txtTurn.setText("Click again to close the chit!");
						btnPod3.setOnClickListener(new OnClickListener() {
							
							public void onClick(View v) {
								// TODO Auto-generated method stub
								btnPod3.setClickable(false);
								count++;
								btnPod3.setText("");
								btnPod3.setBackgroundResource(R.drawable.podblhalf);
								txtTurn.setText(nextTurn);
								btnPod2.setClickable(true);
								btnPod1.setClickable(true);
								btnPod4.setClickable(true);
								if(count == 4){
									
									txtTurn.setText("Click on Guess!");
									btnPlay.setClickable(true);
									count = 0;
									
								}
							}
						});
					}
				});
		     
			
			
			
			btnPod4 = (Button)findViewById(R.id.btnPod4);
			btnPod4.setBackgroundResource(R.drawable.podbrclosed);
			
			btnPod4.setOnClickListener(new OnClickListener() {
					
					public void onClick(View v) {
						// TODO Auto-generated method stub
						player4 = solutionArray[3];
						btnPod4.setText(player4);
						btnPod4.setBackgroundResource(R.drawable.podopen);
						

						btnPod2.setClickable(false);
						btnPod3.setClickable(false);
						btnPod1.setClickable(false);
						if(txtTurn.getText().equals(player1_name + "'s" + " turn!")){
							
							if(player4.equals("MANTRI")){
								
								player1_role = "MANTRI";
							}
							if(player4.equals("RAJA")){
								
								player1_role = "RAJA";
							}
							if(player4.equals("SIPAHI")){

								player1_role = "SIPAHI";
							}
							if(player4.equals("CHOR")){
								
								player1_role = "CHOR";
							}
							nextTurn = player2_name+ "'s" + " turn!";
							
						}
						if(txtTurn.getText().equals(player2_name + "'s" + " turn!")){
							
							if(player4.equals("MANTRI")){
								
								player2_role = "MANTRI";
							}
							if(player4.equals("RAJA")){
								
								player2_role = "RAJA";
							}
							if(player4.equals("SIPAHI")){

								player2_role = "SIPAHI";
							}
							if(player4.equals("CHOR")){
								
								player2_role = "CHOR";
							}
							nextTurn = player3_name+ "'s" + " turn!";
							
						}
						if(txtTurn.getText().equals(player3_name + "'s" + " turn!")){
							
							if(player4.equals("MANTRI")){
								
								player3_role = "MANTRI";
							}
							if(player4.equals("RAJA")){
								
								player3_role = "RAJA";
							}
							if(player4.equals("SIPAHI")){

								player3_role = "SIPAHI";
							}
							if(player4.equals("CHOR")){
								
								player3_role = "CHOR";
							}
							nextTurn = player4_name+ "'s" + " turn!";
							
						}
						if(txtTurn.getText().equals(player4_name + "'s" + " turn!")){
							
							if(player4.equals("MANTRI")){
								
								player4_role = "MANTRI";
							}
							if(player4.equals("RAJA")){
								
								player4_role = "RAJA";
							}
							if(player4.equals("SIPAHI")){

								player4_role = "SIPAHI";
							}
							if(player4.equals("CHOR")){
								
								player4_role = "CHOR";
							}
							nextTurn = "Click on Guess!";
							
						}
						
						txtTurn.setText("Click again to close the chit!");
						btnPod4.setOnClickListener(new OnClickListener() {
							
							public void onClick(View v) {
								// TODO Auto-generated method stub
								btnPod4.setClickable(false);
								count++;
								btnPod4.setText("");
								btnPod4.setBackgroundResource(R.drawable.podbrhalf);
								txtTurn.setText(nextTurn);
								btnPod2.setClickable(true);
								btnPod3.setClickable(true);
								btnPod1.setClickable(true);
								if(count == 4){
									
									txtTurn.setText(nextTurn);
									btnPlay.setClickable(true);
									count = 0;
									
								}
							}
						});
					}
				});    
			
			btnPod1.setText("");
			btnPod2.setText("");
			btnPod3.setText("");
			btnPod4.setText("");
    	
    	
    }
    
    public void setRole(String role, String player){
    	
    	if(player1.equals("MANTRI")){
			
			player4_role = "MANTRI";
		}
		if(player1.equals("RAJA")){
			
			player4_role = "RAJA";
		}
		if(player1.equals("SIPAHI")){

			player4_role = "SIPAHI";
		}
		if(player1.equals("CHOR")){
			
			player4_role = "CHOR";
		}
    	
    	
    } 
    
    void shuffleArray(String[] solutionArray)
    {
    	Random rnd = new Random();
    	for (int i = solutionArray.length - 1; i >= 0; i--)
    		{
    			int index = rnd.nextInt(i + 1);
  
    			String a = solutionArray[index];
    			solutionArray[index] = solutionArray[i];
    			solutionArray[i] = a;
    		}
	}
    
    static void updateScore(){
    	
    	Log.v("AkhandBakar", "##########"+ guess);
    	if(player1_role.equals("MANTRI"))
    	{
    		Log.v("AkhandBakar", "##########Mantri"+ player1_name);
    	if(guess)
    		{
    		i = i+80;
    		p1score=i;
    		txtTurn.setText(player1_name+" is right!");
    		btnPod1.setText(player1);
			btnPod2.setText(player2);
			btnPod3.setText(player3);
			btnPod4.setText(player4);
			btnPod1.setBackgroundResource(R.drawable.podopen);
			btnPod2.setBackgroundResource(R.drawable.podopen);
			btnPod3.setBackgroundResource(R.drawable.podopen);
			btnPod4.setBackgroundResource(R.drawable.podopen);
    		if(player2_role.equals("CHOR"))
    			{
    			p2score=j;
    			if(player3_role.equals("RAJA")){
    				
    				k = k+100;
    				l = l+50;
    				p3score=k;
    				p4score=l;
    			}else{
    				
    				l = l+100;
    				k = k+50;
    				p4score=l;
    				p3score=k;
    			}
    			}
    		if(player3_role.equals("CHOR"))
    			{
    			
    			p3score=k;
    			
    			
    			if(player2_role.equals("RAJA")){
    				
    				j = j+100;
    				l = l+50;
    				p2score=j;
    				p4score=l;
    			}else{
    				
    				l = l+100;
    				j = j+50;
    				p4score=l;
    				p2score=j;
    			}
    			}
    		if(player4_role.equals("CHOR"))
    			{
    			
    			p4score=l;
    			
    			if(player3_role.equals("RAJA")){
    				
    				k = k+100;
    				j = j+50;
    				p2score=j;
    				p3score=k;
    			}else{
    				
    				j = j+100;
    				k = k+50;
    				p3score=k;
    				p2score=j;
    			}
    			}
    		}
    	else
    		{
    		i=i-80;
    		p1score = i;
    		txtTurn.setText(player1_name+" is wrong!");
    		btnPod1.setText(player1);
			btnPod2.setText(player2);
			btnPod3.setText(player3);
			btnPod4.setText(player4);
			btnPod1.setBackgroundResource(R.drawable.podopen);
			btnPod2.setBackgroundResource(R.drawable.podopen);
			btnPod3.setBackgroundResource(R.drawable.podopen);
			btnPod4.setBackgroundResource(R.drawable.podopen);
			if(player2_role.equals("CHOR"))
			{
				j = j+25;
			p2score=j;
			if(player3_role.equals("RAJA")){
				
				k = k+100;
				l = l+50;
				p3score=k;
				p4score=l;
			}else{
				
				l = l+100;
				k = k+50;
				p4score=l;
				p3score=k;
			}
			}
		if(player3_role.equals("CHOR"))
			{
			k=k+25;
			p3score=k;
			
			
			if(player2_role.equals("RAJA")){
				
				j = j+100;
				l = l+50;
				p2score=j;
				p4score=l;
			}else{
				
				l = l+100;
				j = j+50;
				p4score=l;
				p2score=j;
			}
			}
		if(player4_role.equals("CHOR"))
			{
			l=l+25;
			p4score=l;
			
			if(player3_role.equals("RAJA")){
				
				k = k+100;
				j = j+50;
				p2score=j;
				p3score=k;
			}else{
				
				j = j+100;
				k = k+50;
				p3score=k;
				p2score=j;
			}
			}
    		}

    	}
    if(player2_role.equals("MANTRI"))
    	{
    	if(guess)
    		{
    		Log.v("AkhandBakar", "##########Mantri"+ player2_name);
    		j = j+80;
    		p2score=j;
    		txtTurn.setText(player2_name+" is right!");
    		btnPod1.setText(player1);
			btnPod2.setText(player2);
			btnPod3.setText(player3);
			btnPod4.setText(player4);
			btnPod1.setBackgroundResource(R.drawable.podopen);
			btnPod2.setBackgroundResource(R.drawable.podopen);
			btnPod3.setBackgroundResource(R.drawable.podopen);
			btnPod4.setBackgroundResource(R.drawable.podopen);
    		if(player1_role.equals("CHOR"))
    			{
    			p1score=i;
    			
    			if(player3_role.equals("RAJA")){
    			
    				k = k+100;
    				l = l+50;
    				p3score=k;
    				p4score=l;
    			
    			}else{
    				
    				l = l+100;
    				k = k+50;
    				p4score=l;
    				p3score=k;
    			}
    			
    			}
    		if(player3_role.equals("CHOR"))
    			{
    			
    			p3score=k;
    			
    			
    			if(player1_role.equals("RAJA")){
    				
    				i = i+100;
    				l = l+50;
    				p1score=i;
    				p4score=l;
    				
    			}else{
    				
    				l = l+100;
    				i = i+50;
    				p1score=i;
    				p4score=l;
    				
    			}
    			
    			}
    		if(player4_role.equals("CHOR"))
    			{
    			
    			p4score=l;
    			
    			if(player1_role.equals("RAJA")){
    				
    				i = i+100;
    				k = k+50;
    				p1score=i;
        			p3score=k;
    				
    			}else{
    				
    				k = k+100;
    				i = i+50;
    				p1score=i;
        			p3score=k;
    			
    			
    			}
    			
    			
    			}
    		}
    	else
    		{
    		 
    		j=j-80;
    		p2score = j;
    		txtTurn.setText(player2_name+" is wrong!");
    		btnPod1.setText(player1);
			btnPod2.setText(player2);
			btnPod3.setText(player3);
			btnPod4.setText(player4);
			btnPod1.setBackgroundResource(R.drawable.podopen);
			btnPod2.setBackgroundResource(R.drawable.podopen);
			btnPod3.setBackgroundResource(R.drawable.podopen);
			btnPod4.setBackgroundResource(R.drawable.podopen);
			if(player1_role.equals("CHOR"))
			{
				i = i+25;
			p1score=i;
			
			if(player3_role.equals("RAJA")){
			
				k = k+100;
				l = l+50;
				p3score=k;
				p4score=l;
			
			}else{
				
				l = l+100;
				k = k+50;
				p4score=l;
				p3score=k;
			}
			
			}
		if(player3_role.equals("CHOR"))
			{
			k = k+25;
			p3score=k;
			
			
			if(player1_role.equals("RAJA")){
				
				i = i+100;
				l = l+50;
				p1score=i;
				p4score=l;
				
			}else{
				
				l = l+100;
				i = i+50;
				p1score=i;
				p4score=l;
				
			}
			
			}
		if(player4_role.equals("CHOR"))
			{
			l = l+25;
			p4score=l;
			
			if(player1_role.equals("RAJA")){
				
				i = i+100;
				k = k+50;
				p1score=i;
    			p3score=k;
				
			}else{
				
				k = k+100;
				i = i+50;
				p1score=i;
    			p3score=k;
			
			
			}
			
			
			}
    		}

    	}
    if(player3_role.equals("MANTRI"))
    	{
    	Log.v("AkhandBakar", "##########Mantri"+ player3_name);
    	if(guess)
    		{
    		k = k+80;
    		p3score = k;
    		txtTurn.setText(player3_name+" is right!");
    		btnPod1.setText(player1);
			btnPod2.setText(player2);
			btnPod3.setText(player3);
			btnPod4.setText(player4);
			btnPod1.setBackgroundResource(R.drawable.podopen);
			btnPod2.setBackgroundResource(R.drawable.podopen);
			btnPod3.setBackgroundResource(R.drawable.podopen);
			btnPod4.setBackgroundResource(R.drawable.podopen);
    		if(player1_role.equals("CHOR"))
    			{
    			p1score=i;
    			
    			if(player2_role.equals("RAJA")){
    				
    				j = j+100;
    				l = l+50;
    				p2score=j;
        			p4score=l;
        			
    				
    			}else{
    				
    				l = l+100;
    				j = j+50;
    				p2score=j;
        			p4score=l;
    				
    				
    			}
    			
    			}
    		if(player2_role.equals("CHOR"))
    			{
    			
    			p2score=j;
    			
    			
    			if(player1_role.equals("RAJA")){
    				
    				i = i+100;
    				l = l+50;
    				p1score=i;
    				p4score=l;
    				
    			}else{
    				
    				i = i+50;
    				l = l+100;
    				p1score=i;
    				p4score=l;
    				
    			}
    			
    			}
    		if(player4_role.equals("CHOR"))
    			{
    			
    			p4score=l;
    			
    			if(player2_role.equals("RAJA")){
    				
    				j = j+100;
    				i = i+50;
    				p1score=i;
        			p2score=j;
    				
    			}else{
    				
    				j = j+50;
    				i = i+100;
    				p1score=i;
        			p2score=j;
    				
    			}
    			
    			
    			}
    		}
    	else
    		{
    		k = k-80;
    		p3score = k;
    		txtTurn.setText(player3_name+" is wrong!");
    		btnPod1.setText(player1);
			btnPod2.setText(player2);
			btnPod3.setText(player3);
			btnPod4.setText(player4);
			btnPod1.setBackgroundResource(R.drawable.podopen);
			btnPod2.setBackgroundResource(R.drawable.podopen);
			btnPod3.setBackgroundResource(R.drawable.podopen);
			btnPod4.setBackgroundResource(R.drawable.podopen);
			if(player1_role.equals("CHOR"))
			{
				i = i+25;
			p1score=i;
			
			if(player2_role.equals("RAJA")){
				
				j = j+100;
				l = l+50;
				p2score=j;
    			p4score=l;
    			
				
			}else{
				
				l = l+100;
				j = j+50;
				p2score=j;
    			p4score=l;
				
				
			}
			
			}
		if(player2_role.equals("CHOR"))
			{
			j = j+25;
			p2score=j;
			
			
			if(player1_role.equals("RAJA")){
				
				i = i+100;
				l = l+50;
				p1score=i;
				p4score=l;
				
			}else{
				
				i = i+50;
				l = l+100;
				p1score=i;
				p4score=l;
				
			}
			
			}
		if(player4_role.equals("CHOR"))
			{
			l = l+25;
			p4score=l;
			
			if(player2_role.equals("RAJA")){
				
				j = j+100;
				i = i+50;
				p1score=i;
    			p2score=j;
				
			}else{
				
				j = j+50;
				i = i+100;
				p1score=i;
    			p2score=j;
				
			}
			
			
			}
    		}

    	}
    if(player4_role.equals("MANTRI"))
    	{
    	Log.v("AkhandBakar", "##########Mantri"+ player4_name);
    	if(guess)
    		{
    		l = l+80;
    		p4score=l;
    		txtTurn.setText(player4_name+" is right!");
    		btnPod1.setText(player1);
			btnPod2.setText(player2);
			btnPod3.setText(player3);
			btnPod4.setText(player4);
			btnPod1.setBackgroundResource(R.drawable.podopen);
			btnPod2.setBackgroundResource(R.drawable.podopen);
			btnPod3.setBackgroundResource(R.drawable.podopen);
			btnPod4.setBackgroundResource(R.drawable.podopen);
    		if(player1_role.equals("CHOR"))
    			{
    			p1score=i;
    			
    			
    			if(player2_role.equals("RAJA")){
    				
    				j = j+100;
    				k = k+50;
    				p2score=j;
        			p3score=k;
    				
    			}else{
    				
    				j = j+50;
    				k = k+100;
    				p2score=j;
        			p3score=k;
    				
    			}
    			}
    		if(player2_role.equals("CHOR"))
    			{
    			
    			p2score=j;
    			
    			
    			if(player1_role.equals("RAJA")){
    				
    				i = i+100;
    				k = k+50;
    				p1score=i;
    				p3score=k;
    			}else{
    				
    				i = i+50;
    				k = k+100;
    				p1score=i;
    				p3score=k;
    				
    			}
    			
    			}
    		if(player3_role.equals("CHOR"))
    			{
    			
    			p3score=k;
    			
    			if(player1_role.equals("RAJA")){
    				
    				i = i+100;
    				j = j+50;
    				p1score=i;
        			p2score=j;
    			}else{
    				
    				i = i+50;
    				j = j+100;
    				p1score=i;
        			p2score=j;
    				
    			}
    			
    			
    			}
    		}
    	else
    		{
    		l = l-80;
    		p4score = l;
    		txtTurn.setText(player4_name+" is wrong!");
    		btnPod1.setText(player1);
			btnPod2.setText(player2);
			btnPod3.setText(player3);
			btnPod4.setText(player4);
			btnPod1.setBackgroundResource(R.drawable.podopen);
			btnPod2.setBackgroundResource(R.drawable.podopen);
			btnPod3.setBackgroundResource(R.drawable.podopen);
			btnPod4.setBackgroundResource(R.drawable.podopen);
			if(player1_role.equals("CHOR"))
			{
				i = i+25;
			p1score=i;
			
			
			if(player2_role.equals("RAJA")){
				
				j = j+100;
				k = k+50;
				p2score=j;
    			p3score=k;
				
			}else{
				
				j = j+50;
				k = k+100;
				p2score=j;
    			p3score=k;
				
			}
			}
		if(player2_role.equals("CHOR"))
			{
			j=j+25;
			p2score=j;
			
			
			if(player1_role.equals("RAJA")){
				
				i = i+100;
				k = k+50;
				p1score=i;
				p3score=k;
			}else{
				
				i = i+50;
				k = k+100;
				p1score=i;
				p3score=k;
				
			}
			
			}
		if(player3_role.equals("CHOR"))
			{
			k=k+25;
			p3score=k;
			
			if(player1_role.equals("RAJA")){
				
				i = i+100;
				j = j+50;
				p1score=i;
    			p2score=j;
			}else{
				
				i = i+50;
				j = j+100;
				p1score=i;
    			p2score=j;
				
			}
			
			
			}
    		}

    	}
    	
    
    Log.v("AkhandBakar", "##########Score "+ i);
	txtPlayer1.setText("1."+ player1_name + " [" + i + "]");
	Log.v("AkhandBakar", player1 + " [" + i + "]");
	
	txtPlayer2.setText("2." + player2_name+ " [" + j + "]");
	
	Log.v("AkhandBakar", player2 + " [" + p2score + "]");
	
	txtPlayer3.setText("3." + player3_name+ " [" + k + "]");
	Log.v("AkhandBakar", player3 + " [" + p3score + "]");
	
	txtPlayer4.setText("4."+player4_name+ " [" + l + "]");	
	Log.v("AkhandBakar", player4 + " [" + p4score + "]");
    }
}
