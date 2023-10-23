import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CategoryOfSecurityFormService } from './category-of-security-form.service';
import { CategoryOfSecurityService } from '../service/category-of-security.service';
import { ICategoryOfSecurity } from '../category-of-security.model';

import { CategoryOfSecurityUpdateComponent } from './category-of-security-update.component';

describe('CategoryOfSecurity Management Update Component', () => {
  let comp: CategoryOfSecurityUpdateComponent;
  let fixture: ComponentFixture<CategoryOfSecurityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let categoryOfSecurityFormService: CategoryOfSecurityFormService;
  let categoryOfSecurityService: CategoryOfSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CategoryOfSecurityUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CategoryOfSecurityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CategoryOfSecurityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    categoryOfSecurityFormService = TestBed.inject(CategoryOfSecurityFormService);
    categoryOfSecurityService = TestBed.inject(CategoryOfSecurityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const categoryOfSecurity: ICategoryOfSecurity = { id: 456 };

      activatedRoute.data = of({ categoryOfSecurity });
      comp.ngOnInit();

      expect(comp.categoryOfSecurity).toEqual(categoryOfSecurity);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICategoryOfSecurity>>();
      const categoryOfSecurity = { id: 123 };
      jest.spyOn(categoryOfSecurityFormService, 'getCategoryOfSecurity').mockReturnValue(categoryOfSecurity);
      jest.spyOn(categoryOfSecurityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categoryOfSecurity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: categoryOfSecurity }));
      saveSubject.complete();

      // THEN
      expect(categoryOfSecurityFormService.getCategoryOfSecurity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(categoryOfSecurityService.update).toHaveBeenCalledWith(expect.objectContaining(categoryOfSecurity));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICategoryOfSecurity>>();
      const categoryOfSecurity = { id: 123 };
      jest.spyOn(categoryOfSecurityFormService, 'getCategoryOfSecurity').mockReturnValue({ id: null });
      jest.spyOn(categoryOfSecurityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categoryOfSecurity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: categoryOfSecurity }));
      saveSubject.complete();

      // THEN
      expect(categoryOfSecurityFormService.getCategoryOfSecurity).toHaveBeenCalled();
      expect(categoryOfSecurityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICategoryOfSecurity>>();
      const categoryOfSecurity = { id: 123 };
      jest.spyOn(categoryOfSecurityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categoryOfSecurity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(categoryOfSecurityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
