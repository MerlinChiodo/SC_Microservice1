/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     22.05.2022 18:40:24                          */
/*==============================================================*/


/*==============================================================*/
/* Table: Citizen                                               */
/*==============================================================*/
create table Citizen
(
   citizen_id           int unsigned not null auto_increment  comment '',
   firstname            varchar(100) not null                 comment '',
   lastname             varchar(100) not null                 comment '',
   gender               varchar(1)                            comment '',
   birthname            varchar(100)                          comment '',
   place_of_birth       varchar(100)                          comment '',
   birthdate            date         not null                 comment '',
   email                varchar(100) not null                 comment '',
   street               varchar(100)                          comment '',
   housenumber          varchar(5)                            comment '',
   city_code            int                                   comment '',
   city                 varchar(100)                          comment '',
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
/* Table: NewCitizenData                                        */
/*==============================================================*/
create table NewCitizenData
(
   citizen_id_new       int unsigned not null auto_increment  comment '',
   firstname            varchar(100)  comment '',
   lastname             varchar(100)  comment '',
   street               varchar(100)  comment '',
   housenumber          varchar(5)  comment '',
   city_code            int  comment '',
   city                 varchar(100)  comment '',
   primary key (citizen_id_new)
);

/*==============================================================*/
/* Table: Permit                                                */
/*==============================================================*/
create table Permit
(
   permit_id            int unsigned not null auto_increment  comment '',
   title                varchar(100) not null  comment '',
   description          text  comment '',
   primary key (permit_id)
);

/*==============================================================*/
/* Table: Permits                                               */
/*==============================================================*/
create table Permits
(
   permits_id           int unsigned not null auto_increment  comment '',
   citizen_id           int unsigned not null  comment '',
   permit_id            int unsigned not null  comment '',
   date_of_issue        date  comment '',
   valid_until          date  comment '',
   description          text  comment '',
   processed            tinyint(1) not null  comment '',
   primary key (permits_id)
);

/*==============================================================*/
/* Table: RelationshipChange                                    */
/*==============================================================*/
create table RelationshipChange
(
   id                   int unsigned not null auto_increment  comment '',
   citizen_id_1         int unsigned not null  comment '',
   citizen_id_2         int unsigned not null  comment '',
   change_type          varchar(15) not null  comment '',
   status               varchar(10) not null  comment '',
   primary key (id)
);

/*==============================================================*/
/* Table: Request                                               */
/*==============================================================*/
create table Request
(
   request_id           int unsigned not null auto_increment  comment '',
   citizen_id           int unsigned not null  comment '',
   citizen_id_new       int unsigned not null  comment '',
   opened               datetime not null DEFAULT CURRENT_TIMESTAMP comment '',
   closed               datetime  comment '',
   status               varchar(10) not null  comment '',
   reasoning            varchar(255)  comment '',
   primary key (request_id)
);

alter table Custody add constraint FK_CUSTODY_CUSTODY_CITIZEN foreign key (guardian_id)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table Custody add constraint FK_CUSTODY_CUSTODY2_CITIZEN foreign key (child_id)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table Marriage add constraint FK_MARRIAGE_MARRIAGE_CITIZEN foreign key (partner_1)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table Marriage add constraint FK_MARRIAGE_MARRIAGE2_CITIZEN foreign key (partner_2)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table Permits add constraint FK_PERMITS_CITIZENPE_CITIZEN foreign key (citizen_id)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table Permits add constraint FK_PERMITS_PERMITPER_PERMIT foreign key (permit_id)
      references Permit (permit_id) on delete restrict on update restrict;

alter table RelationshipChange add constraint FK_RELATION_RELATIONS_CITIZEN foreign key (citizen_id_1)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table RelationshipChange add constraint FK_RELATION_RELATIONS_CITIZEN2 foreign key (citizen_id_2)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table Request add constraint FK_REQUEST_RELATIONS_CITIZEN foreign key (citizen_id)
      references Citizen (citizen_id) on delete restrict on update restrict;

alter table Request add constraint FK_REQUEST_RELATIONS_NEWCITIZ foreign key (citizen_id_new)
      references NewCitizenData (citizen_id_new) on delete restrict on update restrict;

