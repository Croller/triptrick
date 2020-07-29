
INSERT INTO users (
  "json"
)
VALUES ('{}');


UPDATE users SET json = '{
  "system": {
    "id": null,
    "company-ids": []
  },
  "custom": {
    "surname": {
      "type": "text",
      "ru": "Фамилия",
      "value": null
    },
    "middlename": {
      "type": "text",
      "ru": "Отчество",
      "value": null
    },
    "birthdate": {
      "type": "date",
      "ru": "Дата рождения",
      "value": null
    },
    "phone": {
      "type": "tel",
      "ru": "Телефон",
      "value": null,
      "properties": {
        "pattern": {
          "value": "[0-9]{1}([0-9]{3})-[0-9]{3}-[0-9]{2}-[0-9]{2}",
          "ru": "Формат 7(999)-999-99-99"
        }
      }
    },
    "address": {
      "type": "text",
      "ru": "Адрес",
      "value": null
    }
  },
  "default": {
    "login": {
      "type": "text",
      "ru": "Логин",
      "value": "root",
      "properties": {
        "pattern": {
          "value": "[0-9a-zA-Z]{3,}",
          "ru": "Любое слово, на латицине, от 3 символов"
        }
      }
    },
    "password": {
      "type": "password",
      "ru": "Пароль",
      "value": "root1987",
      "properties": {
        "pattern": {
          "value": "[0-9a-zA-Z]{6,}",
          "ru": "Любое слово, на латицине, от 6 символов"
        }
      }
    },
    "name": {
      "type": "text",
      "ru": "Имя",
      "value": "Александр"
    },
    "email": {
      "type": "email",
      "ru": "Email",
      "value": "79104643015@yandex.ru"
    }
  }
}' WHERE id = 1;

INSERT INTO roles (
  "users_id",
  "root",
  "company",
  "departments",
  "projects",
  "kpi",
  "tasks",
  "json"
)
VALUES (1, TRUE, 2, 2, 2, 2, 2, '{
  "system": {},
  "custom": {},
  "default": {
    "name": {
      "type": "text",
      "ru": "Название",
      "value": "Администратор - Бог"
    },
    "description": {
      "type": "text",
      "ru": "Описание",
      "value": "Права на просмотр всего и внесение изменений"
    }
  }
}');

SELECT 
  U.*,
  R.root as r_root,
  R.company as r_company,
  R.departments as r_departments,
  R.projects as r_projects,
  R.kpi as r_kpi,
  R.tasks as r_tasks,
  R.json as r_json
FROM users U, roles R
WHERE U.id = 1 AND R.id = U.id;

