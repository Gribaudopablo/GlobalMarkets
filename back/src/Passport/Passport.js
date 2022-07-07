const mongoose=require ('mongoose');

const usergogle=require ('../models/usergoogle');

let TwitterStrategy= require('passport-twitter').Strategy;

module.exports=function (passport){

          passport.serializeUser(function(user,donde){

                   donde(null,user);
          } );

          
          passport.deserializeUser(function(obj,donde){

            donde(null,obj);
          } );


          passport.use(new TwitterStrategy({
                   consumerKey:'RHRxZGlVUS1zNEp1a0tEX1U0RnM6MTpjaQ',
                   consumerSecret:'N4WDXCVRQ0Rs10KwzZKgcZrpAaEIbQ8jA_zapLsL7ALYxTBypD',
                   callbackURL:'/auth/twitter/callback'
          },function ( accessToken,refreshToken, profile,done){

                     usergogle.findOne({provider_id:profile.id},funtion(error,user));

                     if(error) throw(error);

                     if(!error && usergogle != null) return done(null,user);

                     let usernew= new usergogle({
                        provider_id:profile.id,
                        provider:profile.provider,
                        name:profile.displayName,
                        photo:profile.photos[0].value,

                     });

                     usergogle.save(function (error){
                        if(error)throw (error);
                        done(null,usernew);
                     });

                     



         }))





}