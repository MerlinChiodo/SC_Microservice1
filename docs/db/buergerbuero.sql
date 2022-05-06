/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     06.05.2022 13:35:39                          */
/*==============================================================*/


alter table Custody 
   drop foreign key FK_CUSTODY_CUSTODY_CITIZEN;

alter table Custody 
   drop foreign key FK_CUSTODY_CUSTODY2_CITIZEN;

alter table Marriage 
   drop foreign key FK_MARRIAGE_MARRIAGE_CITIZEN;

alter table Marriage 
   drop foreign key FK_MARRIAGE_MARRIAGE2_CITIZEN;

alter table Permits 
   drop foreign key FK_PERMITS_PERMITS_PERMIT;

alter table Permits 
   drop foreign key FK_PERMITS_PERMITS2_CITIZEN;

alter table Requests 
   drop foreign key FK_REQUESTS_REQUESTS_REQUEST;

alter table Requests 
   drop foreign key FK_REQUESTS_REQUESTS2_CITIZEN;

drop table if exists Citizen;


alter table Custody 
   drop foreign key FK_CUSTODY_CUSTODY_CITIZEN;

alter table Custody 
   drop foreign key FK_CUSTODY_CUSTODY2_CITIZEN;

drop table if exists Custody;


alter table Marriage 
   drop foreign key FK_MARRIAGE_MARRIAGE_CITIZEN;

alter table Marriage 
   drop foreign key FK_MARRIAGE_MARRIAGE2_CITIZEN;

drop table if exists Marriage;

drop table if exists Permit;


alter table Permits 
   drop foreign key FK_PERMITS_PERMITS_PERMIT;

alter table Permits 
   drop foreign key FK_PERMITS_PERMITS2_CITIZEN;

drop table if exists Permits;

drop table if exists Request;


alter table Requests 
   drop foreign key FK_REQUESTS_REQUESTS_REQUEST;

alter table Requests 
   drop foreign key FK_REQUESTS_REQUESTS2_CITIZEN;

drop table if exists Requests;

/*==============================================================*/
/* Table: Citizen                                               */
/*==============================================================*/
create table Citizen
(
   citizen_id           int unsigned not null auto_increment  comment '',
   firstname            varchar(100) not null  comment '',
   lastname             varchar(100) not null  comment '',
   gender               varchar(1) not null  comment '',
   birthname            varchar(100)  comment '',
   place_of_birth       varchar(100)  comment '',
   birthdate            date not null  comment '',
   email                varchar(100)  comment '',
   street               varchar(100) not null  comment '',
   housenumber          varchar(5) not null  comment '',
   city_code            int not null  comment '',
   city                 varchar(100) not null  comment '',
   primary key (citizen_id)
);

/*==============================================================*/
/* Table: Custody                                               */
/*==============================================================*/
create table Custody
(
   guardian_id          int unsigned not null  comment '',
   child_id             int unsigned not null  comment '',
   primary key (guardian_id, child_id)
);

/*==============================================================*/
/* Table: Marriage                                              */
/*==============================================================*/
create table Marriage
(
   partner_1            int unsigned not null  comment '',
   partner_2            int unsigned not null  comment '',
   primary key (partner_1, partner_2)
);

/*==============================================================*/
/* Table: Permit                                                */
/*==============================================================*/
create table Permit
(
   permit_id            int unsigned not null auto_increment  comment '',
   p_title              varchar(100) not null  comment '',
   p_description        text  comment '',
   primary key (permit_id)
);

/*==============================================================*/
/* Table: Permits                                               */
/*==============================================================*/
create table Permits
(
   permit_id            int unsigned not null  comment '',
   citizen_id           int unsigned not null  comment '',
   date_of_issue        date not null  comment '',
   valid_until          date  comment '',
   primary key (permit_id, citizen_id)
);

/*==============================================================*/
/* Table: Request                                               */
/*==============================================================*/
create table Request
(
   request_id           int unsigned not null auto_increment  comment '',
   r_title              varchar(100) not null  comment '',
   r_description        text  comment '',
   primary key (request_id)
);

/*==============================================================*/
/* Table: Requests                                              */
/*==============================================================*/
create table Requests
(
   request_id           int unsigned not null  comment '',
   citizen_id           int unsigned not null  comment '',
   file                 mediumblob  comment '',
   opened               datetime not null  comment '',
   closed               datetime  comment '',
   status               varchar(10) not null  comment '',
   primary key (request_id, citizen_id)
);

alter table Custody add constraint FK_CUSTODY_CUSTODY_CITIZEN foreign key (guardian_id)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table Custody add constraint FK_CUSTODY_CUSTODY2_CITIZEN foreign key (child_id)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table Marriage add constraint FK_MARRIAGE_MARRIAGE_CITIZEN foreign key (partner_1)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table Marriage add constraint FK_MARRIAGE_MARRIAGE2_CITIZEN foreign key (partner_2)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table Permits add constraint FK_PERMITS_PERMITS_PERMIT foreign key (permit_id)
      references Permit (permit_id) on delete restrict on update restrict;

alter table Permits add constraint FK_PERMITS_PERMITS2_CITIZEN foreign key (citizen_id)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table Requests add constraint FK_REQUESTS_REQUESTS_REQUEST foreign key (request_id)
      references Request (request_id) on delete restrict on update restrict;

alter table Requests add constraint FK_REQUESTS_REQUESTS2_CITIZEN foreign key (citizen_id)
      references Citizen (citizen_id) on delete restrict on update restrict;

