/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     29.04.2022 20:41:38                          */
/*==============================================================*/


alter table CUSTODY 
   drop foreign key FK_CUSTODY_CUSTODY_CITIZEN;

alter table CUSTODY 
   drop foreign key FK_CUSTODY_CUSTODY2_CITIZEN;

alter table MARRIAGE 
   drop foreign key FK_MARRIAGE_MARRIAGE_CITIZEN;

alter table MARRIAGE 
   drop foreign key FK_MARRIAGE_MARRIAGE2_CITIZEN;

alter table PERMITS 
   drop foreign key FK_PERMITS_PERMITS_PERMIT;

alter table PERMITS 
   drop foreign key FK_PERMITS_PERMITS2_CITIZEN;

alter table REQUESTS 
   drop foreign key FK_REQUESTS_REQUESTS_REQUEST;

alter table REQUESTS 
   drop foreign key FK_REQUESTS_REQUESTS2_CITIZEN;

drop table if exists CITIZEN;


alter table CUSTODY 
   drop foreign key FK_CUSTODY_CUSTODY_CITIZEN;

alter table CUSTODY 
   drop foreign key FK_CUSTODY_CUSTODY2_CITIZEN;

drop table if exists CUSTODY;


alter table MARRIAGE 
   drop foreign key FK_MARRIAGE_MARRIAGE_CITIZEN;

alter table MARRIAGE 
   drop foreign key FK_MARRIAGE_MARRIAGE2_CITIZEN;

drop table if exists MARRIAGE;

drop table if exists PERMIT;


alter table PERMITS 
   drop foreign key FK_PERMITS_PERMITS_PERMIT;

alter table PERMITS 
   drop foreign key FK_PERMITS_PERMITS2_CITIZEN;

drop table if exists PERMITS;

drop table if exists REQUEST;


alter table REQUESTS 
   drop foreign key FK_REQUESTS_REQUESTS_REQUEST;

alter table REQUESTS 
   drop foreign key FK_REQUESTS_REQUESTS2_CITIZEN;

drop table if exists REQUESTS;

/*==============================================================*/
/* Table: CITIZEN                                               */
/*==============================================================*/
create table CITIZEN
(
   citizen_id           varchar(100) not null  comment '',
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
/* Table: CUSTODY                                               */
/*==============================================================*/
create table CUSTODY
(
   guardian_id          varchar(100) not null  comment '',
   child_id             varchar(100) not null  comment '',
   primary key (guardian_id, child_id)
);

/*==============================================================*/
/* Table: MARRIAGE                                              */
/*==============================================================*/
create table MARRIAGE
(
   partner_1            varchar(100) not null  comment '',
   partner_2            varchar(100) not null  comment '',
   primary key (partner_1, partner_2)
);

/*==============================================================*/
/* Table: PERMIT                                                */
/*==============================================================*/
create table PERMIT
(
   permit_id            int not null auto_increment  comment '',
   p_title              varchar(100) not null  comment '',
   p_description        text  comment '',
   primary key (permit_id)
);

/*==============================================================*/
/* Table: PERMITS                                               */
/*==============================================================*/
create table PERMITS
(
   permit_id            int not null  comment '',
   citizen_id           varchar(100) not null  comment '',
   date_of_issue        date not null  comment '',
   valid_until          date  comment '',
   primary key (permit_id, citizen_id)
);

/*==============================================================*/
/* Table: REQUEST                                               */
/*==============================================================*/
create table REQUEST
(
   request_id           int not null auto_increment  comment '',
   r_title              varchar(100) not null  comment '',
   r_description        text  comment '',
   primary key (request_id)
);

/*==============================================================*/
/* Table: REQUESTS                                              */
/*==============================================================*/
create table REQUESTS
(
   request_id           int not null  comment '',
   citizen_id           varchar(100) not null  comment '',
   file                 mediumblob  comment '',
   opened               datetime not null  comment '',
   closed               datetime  comment '',
   status               varchar(10) not null  comment '',
   primary key (request_id, citizen_id)
);

alter table CUSTODY add constraint FK_CUSTODY_CUSTODY_CITIZEN foreign key (guardian_id)
      references CITIZEN (citizen_id) on delete restrict on update restrict;

alter table CUSTODY add constraint FK_CUSTODY_CUSTODY2_CITIZEN foreign key (child_id)
      references CITIZEN (citizen_id) on delete restrict on update restrict;

alter table MARRIAGE add constraint FK_MARRIAGE_MARRIAGE_CITIZEN foreign key (partner_1)
      references CITIZEN (citizen_id) on delete restrict on update restrict;

alter table MARRIAGE add constraint FK_MARRIAGE_MARRIAGE2_CITIZEN foreign key (partner_2)
      references CITIZEN (citizen_id) on delete restrict on update restrict;

alter table PERMITS add constraint FK_PERMITS_PERMITS_PERMIT foreign key (permit_id)
      references PERMIT (permit_id) on delete restrict on update restrict;

alter table PERMITS add constraint FK_PERMITS_PERMITS2_CITIZEN foreign key (citizen_id)
      references CITIZEN (citizen_id) on delete restrict on update restrict;

alter table REQUESTS add constraint FK_REQUESTS_REQUESTS_REQUEST foreign key (request_id)
      references REQUEST (request_id) on delete restrict on update restrict;

alter table REQUESTS add constraint FK_REQUESTS_REQUESTS2_CITIZEN foreign key (citizen_id)
      references CITIZEN (citizen_id) on delete restrict on update restrict;

